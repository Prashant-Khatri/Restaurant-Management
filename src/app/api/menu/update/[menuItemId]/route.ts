import { uploadToCloudinary } from "@/helpers/uploadToCloudinary"
import dbConnect from "@/lib/dbConnect"
import MenuItemModel from "@/models/MenuItem.models"

export async function PATCH(req : Request,{params} : {params : {menuItemId : string}}){
    try {
        const data=await req.formData()
        console.log(data)
        let name=undefined
        let tempName= data.get('name')
        if(tempName!=="undefined" && tempName!==null && tempName!==""){
            name=tempName.toString()
        }
        let desc=undefined
        let tempDesc= data.get('desc')
        if(tempDesc!=="undefined" && tempDesc!== null && tempDesc!==""){
            desc=tempDesc.toString()
        }
        let price = undefined
        let tempPrice=data.get('price')
        if(tempPrice!==undefined && tempPrice!==null && tempPrice!==""){
            price=Number(tempPrice)
        }
        const image = data.get('image') as File | null
        
        if(!name && !desc && !price && !image){
            return Response.json({
                success : false,
                message : "Atleast one field is required"
            },{status : 401})
        }

        const {menuItemId}=await params
        await dbConnect()
        const menuItem=await MenuItemModel.findById(menuItemId)
        console.log(menuItem)
        if(!menuItem){
            return Response.json({
                success : false,
                message : "MenuItem not found"
            },{status : 401})
        }
        if(name) menuItem.name=name
        if(desc) menuItem.desc=desc
        if(price) menuItem.price=price
        let uploadResult=null
        if(image){
            uploadResult=await uploadToCloudinary(image)
            menuItem.image=uploadResult?.secure_url
        }
        await menuItem.save()
        return Response.json({
            success : true,
            message : "MenuItem update successfully"
        },{status : 200})
    } catch (error) {
        console.log("Couldn't update menu item",error)
        return Response.json({
            success : false,
            message : "Couldn't update menu item"
        },{status : 500})
    }
}
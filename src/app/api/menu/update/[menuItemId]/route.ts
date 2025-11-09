import { uploadToCloudinary } from "@/helpers/uploadToCloudinary"
import dbConnect from "@/lib/dbConnect"
import MenuItemModel from "@/models/MenuItem.models"

export async function PATCH(req : Request,{params} : {params : {menuItemId : string}}){
    try {
        const data=await req.formData()
        const name= data.get('name') as string | null
        const desc= data.get('desc') as string | null
        const price = data.get('price') as number | null 
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
        if(image){
            const uploadResult=await uploadToCloudinary(image)
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
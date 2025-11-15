import { uploadToCloudinary } from "@/helpers/uploadToCloudinary";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import MenuModel from "@/models/Menu.models";
import MenuItemModel from "@/models/MenuItem.models"

export async function POST(req : Request){
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

        console.log(name)
        
        const validTypes=["image/jpeg","image/jpg","image/png","image/webp"]

        if(!image || !name || !desc || !price){
            return Response.json({
                success : false,
                message : "All field are required"
            },{status : 401})
        }
        if(!validTypes.includes(image.type)){
            return Response.json({
                success : false,
                message : "Please upload an image"
            },{status : 401})
        }
        const uploadResult=await uploadToCloudinary(image)

        if(!uploadResult){
            return Response.json({
                success : false,
                message : "Couldn't uplaod image"
            },{status : 401})
        }
        const urlafterImageUpload=uploadResult.secure_url;
        await dbConnect()
        const newMenuItem=new MenuItemModel({
            name,
            desc,
            price,
            image : urlafterImageUpload
        })
        const savedMenuItem=await newMenuItem.save()
        if(!savedMenuItem){
            return Response.json({
                success : false,
                message : "Couldn't save new MenuItem"
            },{status : 401})
        }
        const menu=await MenuModel.findOne({})
        if(!menu){
            return Response.json({
                success : false,
                message : "Couldn't save fetch existing menu"
            },{status : 401})
        }
        menu.items.push(savedMenuItem);
        const updatedMenu=await menu.save()
        if(!updatedMenu){
            return Response.json({
                success : false,
                message : "Couldn't add new MenuItem to existing Menu"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Menu Item added successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error in add new menuItem",error)
        return Response.json({
            success : false,
            message : "Error in add menuitem"
        },{status : 500})
    }
}
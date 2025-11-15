import dbConnect from "@/lib/dbConnect";
import MenuModel from "@/models/Menu.models";

export async function GET(req : Request){
    try {
        dbConnect()
        const res=await MenuModel.findOne({}).populate("items", "name image desc price")
        console.log(res)
        if(!res){
            return Response.json({
                success : false,
                message : "Fail to fetch menu"
            },{status : 401})
        }
        return Response.json({
            success : true,
            message : "Menu Fetched successfully",
            menuItems : res.items
        },{status : 200})
    } catch (error) {
        console.log("Error in fetching menu",error)
        return Response.json({
            success : false,
            message : "Error in fetching menu"
        },{status : 500})
    }
}
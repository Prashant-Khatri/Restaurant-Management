import cloudinary from "@/lib/cloudinary";

export async function uploadToCloudinary(image : File){
    try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        const uploadResult = await cloudinary.uploader.upload(
        `data:${image.type};base64,${buffer.toString("base64")}`,
        { folder: "MenuItems" }
        );
        return uploadResult;
    } catch (error) {
        console.log("Error in uploading to cloudinary",error)
        return null
    }
}
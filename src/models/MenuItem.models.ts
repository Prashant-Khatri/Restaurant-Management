import mongoose,{Schema,Document} from "mongoose";
export interface MenuItem extends Document{
    name : string;
    desc : string;
    image : string;
    price : number
}

export const menuItemSchema : Schema<MenuItem>=new Schema({
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required :true
    },
    price : {
        type : Number,
        required : true
    }
})

const MenuItemModel=(mongoose.models.MenuItem) || (mongoose.model("MenuItem",menuItemSchema));

export default MenuItemModel;
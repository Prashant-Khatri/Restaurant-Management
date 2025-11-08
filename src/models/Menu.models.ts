import mongoose,{Schema,Document} from "mongoose";
import { MenuItem, menuItemSchema } from "./MenuItem.models";
export interface Menu extends Document{
    items : MenuItem[]
}

const menuSchema : Schema<Menu>=new Schema({
    items : [menuItemSchema]
})

const MenuModel=(mongoose.models.Menu) || (mongoose.model("Menu",menuSchema))
export default MenuModel;
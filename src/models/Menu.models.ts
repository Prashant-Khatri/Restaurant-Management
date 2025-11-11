import mongoose,{Schema,Document} from "mongoose";
import "@/models/MenuItem.models";
export interface Menu extends Document{
    items : mongoose.Types.ObjectId[]
}

const menuSchema : Schema<Menu>=new Schema({
    items : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "MenuItem"
    }]
})

const MenuModel=(mongoose.models.Menu) || (mongoose.model("Menu",menuSchema))
export default MenuModel;
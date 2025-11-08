import mongoose,{Schema,Document} from "mongoose";
import { MenuItem, menuItemSchema } from "./MenuItem.models";

export interface OrderItem extends Document{
    menuItem : MenuItem,
    quantity : number;
    price : number
}

export const orderItemSchema : Schema<OrderItem>=new Schema({
    menuItem : {
        type : menuItemSchema,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 1
    },
    price : {
        type : Number,
        required : true
    }
})

const OrderItemModel=(mongoose.models.OrderItem) || (mongoose.model("OrderItem",orderItemSchema))
export default OrderItemModel;
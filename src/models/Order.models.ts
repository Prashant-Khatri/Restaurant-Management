import mongoose,{Schema,Document} from "mongoose";
import { MenuItem, menuItemSchema } from "./MenuItem.models";
export interface OrderItem{
    menuItem : mongoose.Types.ObjectId;
    quantity : number;
    price : number
}

const orderItemSchema : Schema<OrderItem>=new Schema({
    menuItem : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "MenuItem",
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
export interface Order extends Document{
    custId : mongoose.Types.ObjectId;
    orderItems : OrderItem[];
    status : "Preparing" | "Served" | "Paid";
    table : number;
    totalPrice : number
}

const orderSchema : Schema<Order>=new Schema({
    custId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    orderItems : [orderItemSchema],
    status : {
        type : String,
        enum : ["Preparing","Served","Paid"],
        default : "Preparing"
    },
    table : {
        type : Number,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    }
})

const OrderModel=(mongoose.models.Order) || (mongoose.model("Order",orderSchema))
export default OrderModel
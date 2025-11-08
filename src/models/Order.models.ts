import mongoose,{Schema,Document} from "mongoose";
import { OrderItem, orderItemSchema } from "./OrderItem.models";
export interface Order extends Document{
    custId : string;
    orderItems : OrderItem[];
    status : "Preparing" | "Served" | "Paid";
    table : number;
    totalPrice : number
}

const orderSchema : Schema<Order>=new Schema({
    custId : {
        type : String,
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
import mongoose,{Schema,Document} from "mongoose";
export interface User extends Document{
    role : "Admin" | "Staff" | "Customer";
    name : string;
    email : string;
    password : string;
    salary? : number;
    otp : string;
    upiId? : string;
    salaryPaid? : boolean;
}

const userSchema : Schema<User> =new Schema({
    role : {
        type : String,
        enum : ["Admin","Staff","Customer"],
        required : true
    },
    name : {
        type : String,
        required : [true,"Name is required"]
    },
    email : {
        type : String,
        required : [true,"Email is required"],
        unique : [true,"Email should be unique"]
    },
    password : {
        type : String,
        required : [true,"Password is required"]
    },
    salary : {
        type : Number,
        default : 0
    },
    otp : {
        type : String,
        required : true
    },
    upiId : {
        type : String,
    },
    salaryPaid : {
        type : Boolean,
        default : false
    }
})

const UserModel = (mongoose.models.User) || (mongoose.model("User",userSchema));

export default UserModel;
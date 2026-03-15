import { Schema, model, models } from "mongoose";

const UserSchema =  new Schema({

    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required'],
    },

    username: {
        type: String,
        required: [true, 'User is required!'],
        match: [/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 2-20 alphanumeric letters and be unique!"]
    },

    image: {
        type: String 
    },
});

//This checks if a User model already exist ans assigns the variables made to it , 
// if not it creates it
const User = models.User || model("User", UserSchema);

export default User;
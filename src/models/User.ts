import { Schema, model, models } from 'mongoose';
import * as bcrypt from "bcrypt"

interface IUser {
    email: string,
    password: string
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: { type: String, required: false }
})


userSchema.pre("save", async function (next: (err?: Error) => void) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const UserModel = models.User || model<IUser>("User", userSchema)
export default UserModel

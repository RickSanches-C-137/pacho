import { Schema, model } from 'mongoose';

export interface IUser {
    surname: string;
    firstName: string;
    otherName: string;
    gender: string;
    matNumber: string;
    department: string;
    faculty: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
const userSchema = new Schema<IUser>({
    surname: { type: String },
    firstName: { type: String },
    otherName: { type: String },
    gender: { type: String },
    department: { type: String },
    faculty: { type: String },
    email: { type: String },
    password: { type: String },
    matNumber: { type: String },
})

const User = model<IUser>('User', userSchema);
export default User 
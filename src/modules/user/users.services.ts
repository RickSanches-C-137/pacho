import bcrypt from "bcryptjs";
import { SignInBody, SignUpBody } from "./interface/users.types";
import User, { IUser } from "../../models/user.model";
import { BadRequestException } from "../../utils/service-exception";
import { loginResponse } from "../../utils/login-response";


export default class UserService {
    signUp = async (payload: SignUpBody) => {
        console.log("this is it")
        try {
            payload.email = payload.email.toLocaleLowerCase();
            let user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if (user) {
                throw new BadRequestException("Email Already exist")
            }
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            const userData: Partial<IUser> = {
                surname: payload.surname,
                firstName: payload.firstName,
                otherName: payload.lastName,
                department: payload.department,
                faculty: payload.faculty,
                matNumber: payload.matNumber,
                gender: payload.gender,
                email: payload.email,
                password: hashedPassword
            }
            user = await User.create(userData)
            return user
        } catch (err) {
            console.log(err)
        };

    }
    signIn = async (payload: SignInBody) => {
        const user = await User.findOne({ matNumber: payload.matNumber })
        if (!user) {
            throw new BadRequestException('Invalid Creds')
        }

        const validPassword = await bcrypt.compare(payload.password, user.password);
        if (!validPassword) {
            throw new BadRequestException('Invalid Creds')
        }

        return loginResponse(user._id.toString())
    }
}
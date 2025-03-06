import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import { ResponseModel } from "../../utils/ResponseModel";



class AuthController {
    registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).send(
                {
                    success: false,
                    message: "User already exists",
                    StatusCode: 400
                } as ResponseModel
            );

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            await User.create({ name: username, email, password: hashedPassword });

            res.status(201).send(
                {
                    success: true,
                    message: "User registered successfully",
                    StatusCode: 201
                } as ResponseModel
            );
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 500
            } as ResponseModel);
        }
    };

    loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const JWT_SECRET = process.env.JWT_SECRET!;
            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ error: "Invalid email or password" });
            console.log('JWT_SECRET', JWT_SECRET)
            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

            // Generate JWT
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

            res.status(200).send(
                {
                    success: true,
                    message: "Fetched token successfully",
                    StatusCode: 201,
                    data: token
                } as ResponseModel
            );
        } catch (error: any) {
            next({
                success: false,
                message: error.message,
                StatusCode: 500
            } as ResponseModel);
        }
    };
}

export default AuthController;

timestamps: true
import express, { Router } from 'express';
import AuthController from "./auth.controller";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *         username:
 *           type: string
 *           description: User's username
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 */

class AuthRoute {
    private authController: AuthController = new AuthController();
    public routes: Router = express.Router();

    constructor() {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        /**
         * @swagger
         * /auth/register:
         *   post:
         *     summary: Register a new user
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UserRegistration'
         *     responses:
         *       201:
         *         description: User successfully registered
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: User registered successfully
         *                 token:
         *                   type: string
         *       400:
         *         description: Invalid input data
         *       409:
         *         description: User already exists
         */
        this.routes.post("/register", this.authController.registerUser);

        /**
         * @swagger
         * /auth/login:
         *   post:
         *     summary: Login user
         *     tags: [Authentication]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UserLogin'
         *     responses:
         *       200:
         *         description: Login successful
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: Login successful
         *                 token:
         *                   type: string
         *       401:
         *         description: Invalid credentials
         *       404:
         *         description: User not found
         */
        this.routes.post("/login", this.authController.loginUser);
    }
}

export default new AuthRoute().routes;

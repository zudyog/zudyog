import express, { Router } from 'express';
import sectorRoute from './modules/sector/sector.route';
import AuthRoute from './modules/auth/auth.routes';

class AppRoutes {
    public routes: Router = express.Router();
    constructor() {
        this.routes.use("/sectors", sectorRoute);
        this.routes.use("/auth", AuthRoute);
    };
}

export default new AppRoutes().routes;
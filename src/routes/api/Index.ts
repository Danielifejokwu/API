import {Router} from 'express';
import userRouter  from './user';
import carRoutes from './car';
import clothesRouter from "./cloth";
import authRoute from './auth';
import quoteRoutes from "./quote"

const routes = Router();
routes.use('/users', userRouter);
routes.use('/cars', carRoutes);
routes.use('/clothes', clothesRouter);
routes.use('/auth', authRoute);
routes.use("/quote", quoteRoutes);
//cloths
//houses



export default routes;
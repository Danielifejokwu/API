import { NextFunction, Request, Response } from "express";
import {verifyToken } from "../utils/helpers";

export const authenticator  = async (req: Request, res: Response, next: NextFunction) =>{
    let token = req.headers.authorization;

    if(!token){
        res.status(401).json({message: "Missing authentication"})
    }
    const user = await verifyToken(token!, res);
    req.user = user!;
    next();
  
}
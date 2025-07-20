import { NextFunction,Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res:  Response, next: NextFunction) => {

    res.json({messsage: err.message}).status(400)
}
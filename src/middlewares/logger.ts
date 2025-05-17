import express, { Request, Response, NextFunction } from 'express';
//logger middleware
const  basicLogger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const date = new Date();
    console.log(`${method} ${url} ${date.toLocaleString()}`);
    next();
}

export default basicLogger;
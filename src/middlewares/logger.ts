import express, { Request, Response, NextFunction } from 'express';
//logger middleware
const basicLogger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url, headers } = req;
    const date = new Date();
   
    // Log request details
    console.log(`${method} ${url} ${date.toLocaleString()}`);
    console.log(`header`, headers)

    // Capture response details
    // const originalSend = res.send;
    // res.send = function (body) {
    //     console.log(`Response: ${res.statusCode} ${body}`);
    //     return originalSend.apply(this, [body]);
    // };
    
    next();
 
};

export default basicLogger;
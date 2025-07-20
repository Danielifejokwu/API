import { NextFunction, Request, Response } from "express"
import { userTokenResponse } from "../dtos"

export const roleAuthorizer  = (roles: string[]) => {
   
    return (req: Request, res: Response, next: NextFunction) =>{
      const user = req.user as userTokenResponse;

      if( !roles.includes(user.role) ){
        res.status(403).json( { message: 'Unauthorized' } );
      }
      next();
    }
}
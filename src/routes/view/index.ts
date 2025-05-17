  import {Router} from 'express'
import User from '../../models/user';

const viewRouter = Router();

viewRouter.get('/',  (req,res)=>{
    res.send('Server is up and running')
});

viewRouter
.get('/',viewRouter)


export default viewRouter;
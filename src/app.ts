import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/api/Index'
import pageNotFound from './middlewares/pageNotFound';
import basicLogger from './middlewares/logger';
import viewRouter from './routes/view';


const app = express();

dotenv.config();
app.use(basicLogger)
//express middleware
app.use(express.static('src/public'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');


app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', routes);
app.use(viewRouter)
//routes



app.use(pageNotFound)

//user routes

const startServer = () => {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);

    });
};
 export default startServer;

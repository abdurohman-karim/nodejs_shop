import express from 'express';
import {create} from 'express-handlebars';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import hbsHelpers from './utils/index.js';

// Middlewares
import varMiddleware from './middleware/var.js';
import userMiddleware from './middleware/user.js';


// Routes 
import AuthRoutes from './routes/auth.js';
import ProductRoutes from './routes/products.js';



dotenv.config();

const app = express();

const hbs = create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: hbsHelpers
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views')


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: 'Abdurohman', resave: false, saveUninitialized: false, useNewUrlParser: true}));
app.use(flash());

app.use(varMiddleware)
app.use(userMiddleware)


app.use(AuthRoutes);
app.use(ProductRoutes);

const startApp = () => {
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URI);
        const PORT = process.env.PORT || 4200;
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(err){
        console.log(err.message);
    }
}

startApp()

// mongodb+srv://abdurohman:<password>@cluster.iwy8gqd.mongodb.net/?retryWrites=true&w=majority

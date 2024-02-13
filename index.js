import express from 'express';
import {create} from 'express-handlebars';
import AuthRoutes from './routes/auth.js';
import ProductRoutes from './routes/products.js';

const app = express();

const hbs = create({
    defaultLayout: 'main',
    extname: '.hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views')
app.use(express.urlencoded({extended: true}));

app.use(AuthRoutes);
app.use(ProductRoutes);

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

import { Router } from "express";
import Product from "../models/Product.js";
const router = Router();


router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home | My Store',
        isIndex: true,
    })
})

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | My Store',
        isProduct: true
    })
})

router.get('/add-product', (req, res) => {
    res.render('add', {
        title: 'Add Product | My Store',
        isProductAdd: true
    })
})

router.post('/add-product', async (req, res) => {
    const {title, description, price, image} = req.body

    const products = await Product.create(req.body)
    res.redirect('/products')
})

export default router
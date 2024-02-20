import { Router } from "express";
import Product from "../models/Product.js";
import authMiddleware from '../middleware/auth.js'
import userMiddleware from '../middleware/user.js'
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

router.get('/add-product', authMiddleware, (req, res) => {
    res.render('add', {
        title: 'Add Product | My Store',
        isProductAdd: true,
        addError: req.flash('addError')
    })
})

router.post('/add-product', userMiddleware, async (req, res) => {
    const {title, description, price, image} = req.body

    if(!title || !description || !price || !image) {
        req.flash('addError', 'All fields are required')
        res.redirect('/add-product')
        return
    }
    await Product.create({...req.body, userId: req.userId})
    res.redirect('/products')
})

export default router
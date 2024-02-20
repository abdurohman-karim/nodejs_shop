import { Router } from "express";
// Models 
import Product from "../models/Product.js";
// Middlewares
import authMiddleware from '../middleware/auth.js'
import userMiddleware from '../middleware/user.js'

const router = Router();


router.get('/', async (req, res) => {
    const products = await Product.find().lean()

    res.render('index', {
        title: 'Home | My Store',
        isIndex: true,
        authId: req.userId ? req.userId.toString() : 'YO`Q',
        products: products.reverse(),
    })
})

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | My Store',
        isProduct: true
    })
})

// Product Creation
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


// Product Edit
router.get('/edit-product/:id' , authMiddleware, async (req, res) => {
    const product = await Product.findById(req.query.id).lean()
    if(!product) {
        res.redirect('/')
        return
    }
    res.render('edit', {
        title: 'Edit Product | My Store',
        isProductEdit: true,
        product
    })
})
router.post('/edit-product/:id', userMiddleware, async (req, res) => {
    const {title, description, price, image} = req.body
    await Product.findByIdAndUpdate(req.params.id, {...req.body, userId: req.userId})
    res.redirect('/')
})

export default router
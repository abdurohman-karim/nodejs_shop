import { Router } from "express";

// Models 
import Product from "../models/Product.js";

// Middlewares
import authMiddleware from '../middleware/auth.js'
import userMiddleware from '../middleware/user.js'

const router = Router();


router.get('/', async (req, res) => {
    const products = await Product.find().populate('userId').lean()

    res.render('index', {
        title: 'Home | My Store',
        isIndex: true,
        products: products.reverse(),
        authId: req.userId ? req.userId.toString() : null,
        
    })
})

router.get('/products', async (req, res) => {
    const user = req.userId ? req.userId.toString() : null,
    myProducts = await Product.find({userId: user}).lean()
    res.render('products', {
        title: 'Products | My Store',
        isProduct: true,
        myProducts: myProducts.reverse()
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

// Product Show 
router.get('/product/:id', async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id).populate('userId').lean()
    if(!product) {
        res.redirect('/')
        return
    }
    res.render('show', {
        title: `${product.title} | My Store`,
        product: product
    })
})


// Product Edit
router.get('/edit-product/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id).lean()
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

// Product Delete
router.post('/delete-product/:id', authMiddleware, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

export default router
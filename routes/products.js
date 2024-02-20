import { Router } from "express";
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
    res.render('add-product', {
        title: 'Add Product | My Store',
        isProductAdd: true
    })
})

export default router
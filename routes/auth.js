import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login | My Store",
        isLogin: true,
        loginError: req.flash('loginError')
    })
})
router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register | My Store",
        isRegister: true,
        registerError: req.flash('registerError')
    })
})

// Login
router.post("/login", async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        req.flash('loginError', 'All fields are required')
        res.redirect("/login")
        return
    }

    const existUser = await User.findOne({email})
    if(!existUser) {
        req.flash('loginError', 'User not found')
        res.redirect('/login')
        return
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if(!isPasswordValid) {
        req.flash('loginError', 'Wrong password')
        res.redirect('/login')
        return
    }

    console.log(existUser);
    res.redirect("/")
})

// Register
router.post("/register", async (req, res) => {
    const {email, password, full_name} = req.body

    if(!email || !password || !full_name) {
        req.flash('registerError', 'All fields are required')
        res.redirect('/register')
        return
    }

    if(password.length < 7) {
        req.flash('registerError', 'Password must be 8 or more characters')
        res.redirect('/register')
        return
    }

    if(await User.findOne({email})) {
        req.flash('registerError', 'User already exists')
        res.redirect('/register')
        return
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const userData = {
        full_name: full_name,
        email: email,
        password: hashPassword
    }
    const user = await User.create(userData)
    res.redirect("/")
})

export default router
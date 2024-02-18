import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login | My Store",
        isLogin: true
    })
})
router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register | My Store",
        isRegister: true
    })
})

router.post("/login", (req, res) => {
    console.log(req.body);
    res.redirect("/")
})

router.post("/register", async (req, res) => {
    const userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password
    }
    const user = await User.create(userData)
    console.log(user);
    res.redirect("/")
})

export default router
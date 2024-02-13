import { Router } from "express";

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

export default router
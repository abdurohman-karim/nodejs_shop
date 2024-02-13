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

router.post("/login", (req, res) => {
    console.log(req.body);
    res.redirect("/")
})

router.post("/register", (req, res) => {
    console.log(req.body);
    res.redirect("/")
})

export default router
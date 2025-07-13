import { Router } from "express";
import { body } from "express-validator"
import { createAccount } from "./handlers";

const router = Router()

//Authentication and Registry
router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage("Handle can't be empty"),
    body('name')
        .notEmpty()
        .withMessage("Name can't be empty"),
    body('email')
        .isEmail()
        .withMessage("Invalid Email"),
    body('password')
        .isLength({min: 8})
        .withMessage("Password too short - 8 characters minimum")
    createAccount)

router.get('/about', (req, res) => 
{
    res.send('Devtree - This is the About page')
})

router.get('/signIn', (req, res) => 
{
    res.send('Devtree - This is the Sign iIn page')
})

export default router
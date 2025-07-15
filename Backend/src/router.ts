import { Router } from "express";
import { body } from "express-validator"
import { createAccount, logIn } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

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
        .withMessage("Password too short - 8 characters minimum"),
    handleInputErrors,
    createAccount
)

router.post('/about', (req, res) => 
{
    res.send('Devtree - This is the About page')
})

router.post('/auth/logIn', 
    body('email')
        .isEmail()
        .withMessage("Invalid Email"),
    body('password')
        .isLength({min: 8})
        .withMessage("Invalid Password"),
    handleInputErrors,
    logIn
    )

export default router
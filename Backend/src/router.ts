import { Router } from "express";
import { body } from "express-validator"
import { createAccount, getUser, getUserByHandle, logIn, searchByHandle, updateProfile, uploadImage } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";

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
    handleInputErrors, createAccount
)

router.get('/user', authenticate, getUser) 

router.patch('/user', 
    body('handle')
        .notEmpty()
        .withMessage("Handle can't be empty"),
    body('description'),
    handleInputErrors, authenticate, updateProfile
    )

router.post('/auth/logIn', 
    body('email')
        .isEmail()
        .withMessage("Invalid Email"),
    body('password')
        .isLength({min: 8})
        .withMessage("Invalid Password"),
    handleInputErrors, logIn
    )

router.post('/user/image', 
    body('handle')
        .notEmpty()
        .withMessage("Handle can't be empty"),
    body('description'),
    handleInputErrors, authenticate, uploadImage
    )

    router.get('/:handle', authenticate, getUserByHandle) 

    router.post('/search', 
    body('handle')
        .notEmpty()
        .withMessage("Handle can't be empty"),
    handleInputErrors, searchByHandle
    )

export default router
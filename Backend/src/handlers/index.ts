import { Request, Response } from "express"
import { validationResult } from "express-validator"
import slug from "slug"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"

export const createAccount = async (req:Request, res:Response) =>
{
    console.log(req.body)
    const { email, password} = req.body
    const userExists = await User.findOne({email})

    if(userExists)
    {
        const error = new Error("Email already registered")

        return res.status(409).json({error: error.message})
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({handle})

    if(handleExists)
    {
        const error = new Error("Handle unavailable")

        return res.status(409).json({error: error.message})
    }
    
    const user = new User(req.body)
    user.password = await hashPassword(password)

    await user.save()
    console.log("HALP")
    res.status(201).send('Created User')
    
}

export const logIn = async (req:Request, res:Response) =>
{
    const { email, password} = req.body

    //Check if user is registered
    const user = await User.findOne({email})

    if(!user)
    {
        const error = new Error("User doesn't exist")

        return res.status(404).json({error: error.message})
    }

    //Check password
    const isPasswordCorrect = await checkPassword(password, user.password)

    if(!isPasswordCorrect)
    {
        const error = new Error("Password is incorect")

        return res.status(401).json({error: error.message})
    }

    const token = generateJWT({id: user._id})

    res.send(token)
}
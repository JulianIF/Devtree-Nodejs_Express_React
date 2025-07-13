import { Request, Response } from "express"
import { validationResult } from "express-validator"
import slug from "slug"
import User from "../models/User"
import { hashPassword } from "../utils/auth"

export const createAccount = async (req:Request, res:Response) =>
{
    //Handle Errors
    let errors = validationResult(req)
    if(!errors.isEmpty)
    {
        return res.status(400).json({errors: errors.array()})
    }
    console.log(errors)

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

    res.status(201).send(`Created User: ${handle}`)
    
}
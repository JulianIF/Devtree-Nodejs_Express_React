import type { Request, Response, NextFunction } from "express";
import {validationResult} from "express-validator"

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) =>
{
    //Handle Errors
    let errors = validationResult(req)
    if(!errors.isEmpty)
    {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}
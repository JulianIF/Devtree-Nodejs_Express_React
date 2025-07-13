import { Router } from "express";

const router = Router()

//Authentication and Registry
router.post('/auth/register', (req, res) => 
{
    console.log(req.body)
})

router.get('/about', (req, res) => 
{
    res.send('Devtree - This is the About page')
})

router.get('/signIn', (req, res) => 
{
    res.send('Devtree - This is the Sign iIn page')
})

export default router
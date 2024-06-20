import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/db.ts'

const router = Router()
export default router

// ALL
router.get('/', async (req, res) => {
    // if (!req.auth?.sub) {
    //     res.sendStatus(StatusCodes.UNAUTHORIZED)
    //     return
    //   }
    try {
        const data = await db.getAllProjects()
        res.json (data)
    }
    catch (e) {
        res.json({"message" : `${e}`})
    }
})




router.get('/getdevprojects', async (req, res) => {
    try {
        const data = await db.getAllProjects()
        res.json (data)
    }
    catch (e) {
        res.json({"message" : `${e}`})
    }
})
// ID
router.get('/:id', async (req, res) => {
    const { id } = req.params
    // if (!req.auth?.sub) {
    //     res.sendStatus(StatusCodes.UNAUTHORIZED)
    //     return
    //   }
    try {
        const data = await db.getProjectsById(Number(id))
        res.json (data)
    }
    catch (e) {
        res.json({"message" : `${e}`})
    }
})

router.get('/getdevprojects/:id', async (req, res) => {
    const { id } = req.params
    try {
        const data = await db.getProjectsById(Number(id))
        res.json (data)
    }
    catch (e) {
        res.json({"message" : `${e}`})
    }
})
// UPDATE

// CREATE

// DELETE
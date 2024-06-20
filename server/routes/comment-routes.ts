import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/db.ts'

const router= Router()
export default router
// ALL
router.get('/', checkJwt, async (req: JwtRequest, res) => {
    if (!req.auth?.sub) {
        res.sendStatus(StatusCodes.UNAUTHORIZED)
        return
      }
    try {
        const data = await db.getAllComments()
        res.json (data)
    }
    catch (e) {
        res.json({"message" : `${e}`})
    }
})

router.get('/getdevcomments', checkJwt, async (req, res) => {
    try {
        const data = await db.getAllComments()
        res.json (data)
    }
    catch (e) {
        res.json({"message" : `${e}`})
    }
})
// ID
router.get('/:id', checkJwt, async (req: JwtRequest, res) => {
    const { id } = await req.params
    if (!req.auth?.sub) {
        res.sendStatus(StatusCodes.UNAUTHORIZED)
        return
      }
    try {
        const data = db.getCommentById((Number(id)))
        res.json (data)
    }
    catch (e) {
        res.json({"message" : `${e}`})
    }
})

router.get('/getdevcomments/:id', checkJwt, async (req, res) => {
    const { id } = req.params
    try {
        const data = await db.getCommentById((Number(id)))
        res.json (data)
    }
    catch (e) {
        res.json({"message" : `${e}`})
    }
})

// UPDATE

// CREATE

// DELETE
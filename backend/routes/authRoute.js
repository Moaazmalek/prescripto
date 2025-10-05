import {Router} from 'express'
import { login, register,me } from '../controllers/authController.js'
const router=Router()
/**
 * @route /api/auth/login
 * @method POST
 * @description API for user login
 * @access PUBLIC
 */

router.post("/login",login)
/**
 * @route /api/auth/register
 * @method POST
 * @description API for user registration
 * @access PUBLIC
 */

router.post("/register",register)
/**
 * @route /api/auth/me
 * @method POST
 * @description API for getting user information
 * @access PRIVATE
 */

router.get("/me",me)


export default router
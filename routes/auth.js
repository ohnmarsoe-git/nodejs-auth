import express from 'express';
import * as authController from '../controllers/authController.js'
import * as refreshController from '../controllers/refershController.js'

const router = express.Router();

router.post('/auth', authController.handleLogin);

router.get('/refresh', refreshController.handleRefreshToken);

// router.post('/refreshToken', authControllers.refreshToken);

// router.post('/login', authControllers.login);

// router.post('/gitlogin', authControllers.gitLogin);

// router.post('/register', authControllers.register)

// router.post('/logout', authControllers.logout);

export default router;
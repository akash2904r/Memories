import express from 'express';

import { signin, signup, getTokens, decodeAccessToken } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/tokens', getTokens);
router.post('/decode', decodeAccessToken);

export default router;
import express from 'express';
import {getUsers, getUserById, registerUser, loginUser} from "../controllers/usersController";
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/:id', getUserById);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;

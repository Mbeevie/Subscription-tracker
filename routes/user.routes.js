import { Router } from "express";
import { getAllUsers,getUser } from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', authenticateToken, getAllUsers);
userRouter.get('/:id', authenticateToken, getUser);
userRouter.post('/', (req, res) =>res.send({title:'Create new user '}));
userRouter.put('/:id', (req, res) =>res.send({title:`Update user with id ${req.params.id} `}));
userRouter.delete('/:id', (req, res) =>res.send({title:`Delete user with id ${req.params.id} `}));

export default userRouter;
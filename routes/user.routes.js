import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) =>res.send({title:'Get all users '}));
userRouter.get('/:id', (req, res) =>res.send({title:`Get user with id ${req.params.id} `}));
userRouter.post('/', (req, res) =>res.send({title:'Create new user '}));
userRouter.put('/:id', (req, res) =>res.send({title:`Update user with id ${req.params.id} `}));
userRouter.delete('/:id', (req, res) =>res.send({title:`Delete user with id ${req.params.id} `}));

export default userRouter;
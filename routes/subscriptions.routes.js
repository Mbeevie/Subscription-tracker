import { Router } from "express";   

const subscriptionsRouter = Router();

subscriptionsRouter.get('/', (req, res) => res.send({title:'Get all subscriptions '}));
subscriptionsRouter.get('/:id', (req, res) => res.send({title:`Get subscription with id ${req.params.id} `}));
subscriptionsRouter.post('/', (req, res) => res.send({title:'Create new subscription '}));
subscriptionsRouter.put('/:id', (req, res) => res.send({title:`Update subscription with id ${req.params.id} `}));
subscriptionsRouter.delete('/:id', (req, res) => res.send({title:`Delete subscription with id ${req.params.id}`}));

export default subscriptionsRouter;

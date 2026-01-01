import express from 'express';
import './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscriptions.routes.js';
import connectToDatabase from './config/database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(errorMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
  res.send('Hello, welcome to Subscription Tracker! API is working fine.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
    await connectToDatabase();
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;
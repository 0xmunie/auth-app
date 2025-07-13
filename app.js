import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import auth from './routes/auth.route.js';
import errorHandler from './middlewares/error.middleware.js';
import cron from 'node-cron';
import { deleteInactiveUsers } from './utils/accout_deletion.js';
import cookieParser from 'cookie-parser';
import { generalLimiter } from './middlewares/rate_limit.middleware.js';
import helmet from 'helmet';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.disable('x-powered-by');

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(generalLimiter);

await sequelize.sync({ force: false });

app.use('/api', auth);
app.use(errorHandler);

cron.schedule('0 0 * * *', deleteInactiveUsers);

app.listen(port, ()=>{
    console.log(`server is working on port ${port}`);
})
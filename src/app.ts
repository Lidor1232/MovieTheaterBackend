import express, {Request, Response} from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './routes/middlewares/error.middleware';
import {useLoggerRequestId} from './routes/middlewares/request-id-middleware';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(useLoggerRequestId);

// Server app routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Health from /',
    statusCode: 200,
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'healthy',
    statusCode: 200,
  });
});

app.use(errorHandlerMiddleware);

export default app;

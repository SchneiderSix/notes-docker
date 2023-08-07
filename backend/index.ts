import express, {Express, Request, Response} from 'express';
import helmet from 'helmet';
import session from 'express-session';
import cors from 'cors';
import routes from './routes';

declare module 'express-session' {
  //add custom property to session to store user id
  interface SessionData  {
    user: string;
  }
}

const app: Express = express();

//helmet middleware, secure HTTP headers
app.use(helmet());

//sessions middleware
app.use(session({
  secret:'f51d9f71df560caeb80e342ddc8056e2',
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, //expires in 1 day
  }
}));

//cors configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

const port = 8000;

app.use(routes);

app.listen(port, () => {
  console.log("listening on port: " + port);
});

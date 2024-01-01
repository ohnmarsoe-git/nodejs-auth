import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connection from '../db/conn.js';
import { corsOptions } from '../config/corsOptions.js';
import { credentials } from '../middleware/credentials.js';
import authRouter from '../routes/auth.js';
import registerRouter from '../routes/register.js'
import logoutRouter from '../routes/logout.js'
import v1Router  from '../routes/v1/routes/index.js';
import { verifyToken }  from '../middleware/verifyToken.js';

const PORT = 5050;

//connect with db
connection();

const app = express();

app.use(express.json());

app.use(credentials);

// cross origin
app.use(cors(corsOptions));



// bodyPaser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());


//Auth Routes
app.use('/', authRouter);

// Routes
app.use('/', registerRouter);
app.use('/', logoutRouter);


// Router v1
app.use('/api/v1/', verifyToken, v1Router)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})
import  express from "express";
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../../../build/routes';
import swaggerDocument from '../../../build/swagger.json';
import bodyParser from "body-parser";
import { exceptionHandler } from './exception-handler';
import config from './config';
import cors from 'cors'


const app = express()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173','http://127.0.0.1:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma'
  ],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.send('Mon Api')
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app)

app.use(exceptionHandler);

app.listen(config.port ,()=>{
  console.log(`Server running on port http://localhost:${config.port}`)
})

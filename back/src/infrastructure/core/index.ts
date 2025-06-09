import { container } from "tsyringe";
import  express from "express";
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../../../build/routes';
import swaggerDocument from '../../../build/swagger.json';
import bodyParser from "body-parser";
import { exceptionHandler } from './exception-handler';
import config from './config';


const app = express()

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

import express from 'express';
import 'express-async-errors';
import cors from 'cors'
//Cors permite que api seja acedita a partir de um inderco diferente

import './database/conection';
import routes from './routes';
import path from 'path';

import errorHandler from "./errors/Handler";

import bodyParser from "body-parser";

const app = express();

// app.use(express.json());
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..','uploads')))
app.use(errorHandler)





app.listen(3333);

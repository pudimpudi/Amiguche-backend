import * as imagemRepository from '../Repository/imagemRepository.js';
import {Router} from 'express';
const endpoints = Router();
import multer from 'multer';

let uploadImagem = multer ({ dest: './storage/img' });


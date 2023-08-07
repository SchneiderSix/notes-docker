import { Request, Response } from 'express';
import validator from 'validator';
import {createNote} from '../controllers/createNote';

export const noteCreation = (req: Request, res: Response) => {
  try {
    //validate parameters
    const title = req.header('title');
    const description =  req.header('description');
    const category =  req.header('category');
    const userId =  req.header('userId')

    //check session
    if (!req.session.user) return res.status(401).json({message: 'Please Login'});

    //check if headers are empty, null or false
    if (!title || !description || !category || !userId) {
      res.status(403).json({message: 'Invalid parameters'});
      return;
    }

    //check if headers contain special symbols
    if (
      validator.isAlphanumeric(title.replace(/[^a-zA-Z0-9]/g, '')) &&
      validator.isAlphanumeric(description.replace(/[^a-zA-Z0-9]/g, '')) &&
      validator.isAlphanumeric(category.replace(/[^a-zA-Z0-9]/g, '')) &&
      validator.isAlphanumeric(userId)
    ) {
      createNote.noteCreation(req, res);
    } else {
      res.status(401).json({message: 'Invalid parameters'});
    }
  } catch (error) {
    res.status(500).json({message: 'Internal server error'});
  }
};

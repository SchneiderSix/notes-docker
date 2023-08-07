import { Request, Response } from 'express';
import validator from 'validator';
import { getNote } from '../controllers/getNote';

export const noteGetter = (req: Request, res: Response) => {
  try {
    //validate parameters
    const userId =  req.header('userId');
    const archived = req.header('archived');
    const category = req.header('category');

    //check session
    if (!req.session.user) return res.status(401).json({message: 'Please Login'});

    //check if headers are empty, null or false
    if (!userId || !archived || !category) {
      res.status(403).json({message: 'Invalid parameters'});
      return;
    }

    //check if headers contain special symbols
    if (
      validator.isAlphanumeric(userId) &&
      validator.isNumeric(archived) &&
      validator.isAlphanumeric(category) &&
      (archived === '0' || archived === '1')
    ) {
      getNote.noteGetter(req, res);
    } else {
      res.status(401).json({message: 'Invalid parameters'});
    }
  } catch (error) {
    res.status(500).json({message: 'Internal server error'});
  }
};

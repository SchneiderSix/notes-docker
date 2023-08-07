import { Request, Response } from 'express';
import validator from 'validator';
import { deleteNote } from '../controllers/deleteNote';

export const noteDelete = (req: Request, res: Response) => {
  try {
    //validate parameters
    const id =  req.header('id')

    //check session
    if (!req.session.user) return res.status(401).json({message: 'Please Login'});

    //check if headers are empty, null or false
    if (!id) {
      res.status(403).json({message: 'Invalid parameters'});
      return;
    }

    //check if headers contain special symbols
    if (
      validator.isAlphanumeric(id)
    ) {
      deleteNote.noteDelete(req, res);
    } else {
      res.status(401).json({message: 'Invalid parameters'});
    }
  } catch (error) {
    res.status(500).json({message: 'Internal server error'});
  }
};

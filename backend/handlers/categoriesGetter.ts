import { Request, Response } from 'express';
import validator from 'validator';
import { getCategories } from '../controllers/getCategories';

export const categoriesGetter = (req: Request, res: Response) => {
  try {
    //validate parameters
    const userId =  req.header('userId');

    //check session
    if (!req.session.user) return res.status(401).json({message: 'Please Login'});

    //check if headers are empty, null or false
    if (!userId) {
      res.status(403).json({message: 'Invalid parameters'});
      return;
    }

    //check if headers contain special symbols
    if (
      validator.isAlphanumeric(userId)
    ) {
      getCategories.categoriesGetter(req, res);
    } else {
      res.status(401).json({message: 'Invalid parameters'});
    }
  } catch (error) {
    res.status(500).json({message: 'Internal server error'});
  }
};

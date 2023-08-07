import { Request, Response } from 'express';
import {authLogout} from '../controllers/authLogout';

export const logoutAuthorization = (req: Request, res: Response) => {
  try {

    //check if session exists
    if (
      req.session.user
    ) {
      authLogout.logoutAuthorization(req, res);
    } else {
      res.status(401).json({message: 'Session not found'});
    }
  } catch (error) {
    res.status(500).json({message: 'Internal server error'});
  }
};

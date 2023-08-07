import {Request, Response} from 'express';

export const authLogout = {
  logoutAuthorization: async (req: Request, res: Response) => {
    try {

      //destroy session
      req.session.destroy((error) => {
        error ? res.status(500).json({message: 'Internal server error'}) : res.status(200).json({message: 'Session destroyed successfully'});
      });
    } catch (error) {
      res.status(500).json({message: 'Internal server error'});
    }
  },
};
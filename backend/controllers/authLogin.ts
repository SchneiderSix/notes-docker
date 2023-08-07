import {Request, Response} from 'express';
import {pool} from '../db-mysql/credentials';
import { RowDataPacket } from 'mysql2';
import { compare } from 'bcryptjs';

export const authLogin = {
  loginAuthorization: async (req: Request, res: Response) => {
    try {

      //mysql connection
      const promisePool = pool.promise();
      const query = "SELECT `id`, `password` FROM `my_notes`.`user` WHERE `email` = ?";
      const [rows, fields] = await promisePool.query<RowDataPacket[]>(query, [
        req.header('email')
      ]);

      if (rows.length === 1) {
        const passMatched = await compare(req.header('password') as string, rows[0].password);
        if (passMatched) {
          req.session.user = rows[0].id;
          req.session.save();
          res.status(200).json({message: 'Login successful', id: rows[0].id});
        } else {
          res.status(401).json({message: 'Invalid password'});
        }
      } else {
        res.status(409).json({message: 'User not found'});
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'});
    }
  },
};
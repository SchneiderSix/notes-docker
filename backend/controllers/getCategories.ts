import {Request, Response} from 'express';
import {pool} from '../db-mysql/credentials';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

export const getCategories = {
  categoriesGetter: async (req: Request, res: Response) => {
    try {

      //mysql connection
      const promisePool = pool.promise();
      const query = "SELECT DISTINCT `category` FROM `my_notes`.`note` WHERE `userId` = ?; ";
      const [rows, fields] = await promisePool.query<RowDataPacket[]>(query, [
        req.header('userId')
      ]);

      if (rows.length !== 0) {
        return res.status(200).json(rows);
      } else {
        return res.status(409).json({message: 'Categories not obtained'});
      }

    } catch (error) {
      res.status(500).json({message: 'Internal server error'});
    }
  },
};
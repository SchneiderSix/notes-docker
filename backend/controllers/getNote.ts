import {Request, Response} from 'express';
import {pool} from '../db-mysql/credentials';
import { RowDataPacket } from 'mysql2';

export const getNote = {
  noteGetter: async (req: Request, res: Response) => {
    if (req.header('category') === '0') {
      try {

        //mysql connection
        const promisePool = pool.promise();
        const query = "SELECT `id`, `title`, `description`, `category` FROM `my_notes`.`note` WHERE `userId` = ? AND `archived` = ?;";
        const [rows, fields] = await promisePool.query<RowDataPacket[]>(query, [
          req.header('userId'),
          req.header('archived')
        ]);
  
        if (rows.length !== 0) {
          return res.status(200).json(rows);
        } else {
          return res.status(409).json({message: 'Notes not obtained'});
        }
      } catch (error) {
        res.status(500).json({message: 'Internal server error'});
      }
    } else {
      try {

        //mysql connection
        const promisePool = pool.promise();
        const query = "SELECT `id`, `title`, `description`, `category` FROM `my_notes`.`note` WHERE `userId` = ? AND `archived` = ? AND `category` = ?;";
        const [rows, fields] = await promisePool.query<RowDataPacket[]>(query, [
          req.header('userId'),
          req.header('archived'),
          req.header('category')
        ]);
  
        if (rows.length !== 0) {
          return res.status(200).json(rows);
        } else {
          return res.status(409).json({message: 'Notes not obtained'});
        }
      } catch (error) {
        res.status(500).json({message: 'Internal server error'});
      }
    }
  },
};
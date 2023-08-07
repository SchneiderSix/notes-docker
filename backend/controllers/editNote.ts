import {Request, Response} from 'express';
import {pool} from '../db-mysql/credentials';
import { ResultSetHeader } from 'mysql2';

export const editNote = {
  noteEdition: async (req: Request, res: Response) => {
    try {

      //mysql connection
      const promisePool = pool.promise();
      const query = "UPDATE `my_notes`.`note` SET `title` = ?, `description` = ?, `category` = ? WHERE `id` = ?;";
      const [rows, fields] = await promisePool.query<ResultSetHeader>(query, [
        req.header('title'),
        req.header('description'),
        req.header('category'),
        req.header('id')
      ]);

      rows.affectedRows === 1 ? res.status(200).json({message: 'Note edited successfully'}) : res.status(409).json({message: 'Note not edited successfully'});

    } catch (error) {
      res.status(500).json({message: 'Internal server error'});
    }
  },
};
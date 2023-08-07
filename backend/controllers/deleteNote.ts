import {Request, Response} from 'express';
import {pool} from '../db-mysql/credentials';
import { ResultSetHeader } from 'mysql2';

export const deleteNote = {
  noteDelete: async (req: Request, res: Response) => {
    try {

      //mysql connection
      const promisePool = pool.promise();
      const query = "DELETE FROM `my_notes`.`note` WHERE `id` = ?;";
      const [rows, fields] = await promisePool.query<ResultSetHeader>(query, [
        req.header('id')
      ]);

      rows.affectedRows === 1 ? res.status(200).json({message: 'Note deleted successfully'}) : res.status(409).json({message: 'Note not deleted successfully'});

    } catch (error) {
      res.status(500).json({message: 'Internal server error'});
    }
  },
};
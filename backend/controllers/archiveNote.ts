import {Request, Response} from 'express';
import {pool} from '../db-mysql/credentials';
import { ResultSetHeader } from 'mysql2';

export const archiveNote = {
  noteArchivation: async (req: Request, res: Response) => {
    try {

      //mysql connection
      const promisePool = pool.promise();
      const query = "UPDATE `my_notes`.`note` SET `archived` = CASE WHEN `archived` = 0 THEN 1 ELSE 0 END WHERE `id` = ?;";
      const [rows, fields] = await promisePool.query<ResultSetHeader>(query, [
        req.header('id')
      ]);

      if (rows.affectedRows === 1) {
        return res.status(200).json({message: 'Note archived successfully'});
      } else {
        return res.status(409).json({message: 'Note not archived successfully'});
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'});
    }
  },
};
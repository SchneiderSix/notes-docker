import {Request, Response} from 'express';
import {pool} from '../db-mysql/credentials';
import {uid} from 'uid/single';
import { ResultSetHeader } from 'mysql2';

export const createNote = {
  noteCreation: async (req: Request, res: Response) => {
    try {
      //create id
      const noteId = Date.now().toString(36)+Math.random().toString(36).substring(2, 8)+uid(33);

      //mysql connection
      const promisePool = pool.promise();
      const query = "INSERT IGNORE INTO `my_notes`.`note`(`id`, `title`, `description`, `category`, `userId`) values( ?, ?, ?, ?, ?);";
      const [rows, fields] = await promisePool.query<ResultSetHeader>(query, [
        noteId,
        req.header('title'),
        req.header('description'),
        req.header('category'),
        req.header('userId')
      ]);

      rows.affectedRows === 1 ? res.status(200).json({message: 'Note created successfully'}) : res.status(409).json({message: 'Note not created successfully, don\'t repeat titles'});

    } catch (error) {
      res.status(500).json({message: 'Internal server error'});
    }
  },
};
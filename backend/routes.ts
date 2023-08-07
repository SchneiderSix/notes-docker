import express from 'express';
import { noteCreation } from './handlers/noteCreation';
import { noteEdition } from './handlers/noteEdition';
import { noteArchivation } from './handlers/noteArchivation';
import { noteGetter } from './handlers/noteGetter';
import { loginAuthorization } from './handlers/loginAuthorization';
import { logoutAuthorization } from './handlers/logoutAuthorization';
import { noteDelete } from './handlers/noteDelete';
import { categoriesGetter } from './handlers/categoriesGetter';

const router = express.Router();

router.post('/create-notes/', noteCreation);
router.post('/edit-notes/', noteEdition);
router.post('/archive-notes/', noteArchivation);
router.get('/get-notes/', noteGetter);
router.post('/login/', loginAuthorization);
router.post('/logout/', logoutAuthorization);
router.post('/delete-notes/', noteDelete);
router.get('/get-categories/', categoriesGetter);

//check if user has session
router.get('/check-session/', (req, res) => {
  if (req.session.user) {
    res.status(200).json({message: req.session.user});
  } else {
    res.status(200).json({message: 'No'});
  }
});

export default router;

import express from 'express';
import user from './user.js'

const router = express.Router();

router.use('/users', user);

export default router;


// router.get('/', controllers.getAll);

// router.get('/:id', controllers.getOne);

// router.post('/', controllers.createNew);

// router.patch('/:id', controllers.updateOne);

// router.delete('/:id', controllers.deleteOne);

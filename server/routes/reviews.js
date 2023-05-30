// routes/reviews.js

import express from 'express';
import { getAllReviews,
    createReview,
    getReview
} from '../controllers/reviews.js';

const router = express.Router();

router.route('/')
    .get(getAllReviews)
    .post(createReview);

router.route('/:id')
    .get(getReview)


// Add more review routes and corresponding controller functions

export default router;
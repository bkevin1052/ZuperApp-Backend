const { Router } =  require('express');
const router = Router();

router.get('/', async (req, res) => {
    const books = await Book.find().sort('-_id');
    res.json(login);
});

module.exports = router;
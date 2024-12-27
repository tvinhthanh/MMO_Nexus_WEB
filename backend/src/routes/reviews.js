const express = require('express');
const router = express.Router();
const connection = require('../config/database');



router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Truy vấn
  const getQuery = 'SELECT * FROM reviews WHERE product_id = ?';
  connection.query(getQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json(results);

  });
});

router.post('/', (req, res) => {
    const { product_id, customer_id, rating, comment, reviewDate } = req.body;
    // Truy vấn
    const getQuery = 'INSERT INTO `reviews`(`product_id`, `customer_id`, `rating`, `comment`, `reviewDate`) VALUES (?,?,?,?,NOW())';
    connection.query(getQuery, [product_id, customer_id, rating, comment, reviewDate], (err, results) => {
      if (err) {
        return res.status(500).json({result: false});
      }
      res.status(200).json({result: true});

    });
  });

module.exports = router;

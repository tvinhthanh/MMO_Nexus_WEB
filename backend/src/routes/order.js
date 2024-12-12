const express = require('express');
const router = express.Router();
const db = require('../config/database');  // Kết nối cơ sở dữ liệu

router.get('/', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn dữ liệu: ', err);
      return res.status(500).send('Lỗi khi truy vấn dữ liệu');
    }

    res.json(results);  // Gửi dữ liệu trả về cho client
  });
});

router.get('/storeId/:store_id', async (req, res) => {
  const { store_id } = req.params;  // Lấy store_id từ route params

  if (!store_id) {
    return res.status(400).json({ message: "StoreId is required" });  // Trả về lỗi nếu không có store_id
  }

  try {
    // Truy vấn SQL để lấy danh sách đơn hàng từ database
    const result = await pool.query(
      'SELECT * FROM orders WHERE store_id = $1',
      [store_id]  // $1 là placeholder cho store_id
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No orders found for this store" });  // Không tìm thấy đơn hàng
    }

    return res.status(200).json(result.rows);  // Trả về danh sách đơn hàng
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });  // Lỗi trong quá trình truy vấn
  }
});


router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;  // Lấy userId từ URL params
    db.query('SELECT * FROM orders WHERE customer_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Lỗi khi truy vấn dữ liệu: ', err);
        return res.status(500).send('Lỗi khi truy vấn dữ liệu');
      }
      if (results.length === 0) {
        return res.status(404).send('Không tìm thấy đơn hàng cho người dùng này');
      }
      res.json(results); // Trả về danh sách đơn hàng của người dùng
    });
  });
// Lấy chi tiết đơn hàng theo ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM orders WHERE order_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn dữ liệu: ', err);
      return res.status(500).send('Lỗi khi truy vấn dữ liệu');
    }
    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy đơn hàng');
    }
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
    const { customer_id, totalAmount, orderStatus, shippingAddress, paymentMethod, store_id } = req.body;
    console.log(req.body);
    const orderDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    if (!customer_id || !totalAmount || !orderStatus || !shippingAddress || !paymentMethod) {
      return res.status(400).send('Vui lòng cung cấp đầy đủ thông tin đơn hàng');
    }
  
    const query = `
      INSERT INTO orders (customer_id, orderDate, totalAmount, orderStatus, shippingAddress, paymentMethod,store_id)
      VALUES (?, ?, ?, ?, ?, ?,?)
    `;
  
    // Tạo đơn hàng
    db.query(query, [customer_id, orderDate, totalAmount, orderStatus, shippingAddress, paymentMethod, store_id], (err, results) => {
      if (err) {
        console.error('Lỗi khi tạo đơn hàng: ', err);
        return res.status(500).send('Lỗi khi tạo đơn hàng');
      }
  
      // Cập nhật giỏ hàng sau khi tạo đơn hàng thành công
      const updateCartQuery = `
        UPDATE carts SET products = NULL WHERE user_id = ?
      `;
  
      db.query(updateCartQuery, [customer_id], (err, updateResults) => {
        if (err) {
          console.error('Lỗi khi cập nhật giỏ hàng: ', err);
          return res.status(500).send('Lỗi khi cập nhật giỏ hàng');
        }
          res.status(201).send('Đơn hàng đã được tạo và giỏ hàng đã được cập nhật');
      });
    });
  });
  
  

// Cập nhật trạng thái đơn hàng
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;

  db.query('UPDATE orders SET order_status = ? WHERE order_id = ?', [order_status, id], (err, results) => {
    if (err) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng: ', err);
      return res.status(500).send('Lỗi khi cập nhật trạng thái đơn hàng');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Không tìm thấy đơn hàng');
    }
    res.send('Trạng thái đơn hàng đã được cập nhật');
  });
});

// Xóa đơn hàng
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM orders WHERE order_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Lỗi khi xóa đơn hàng: ', err);
      return res.status(500).send('Lỗi khi xóa đơn hàng');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Không tìm thấy đơn hàng');
    }
    res.send('Đơn hàng đã được xóa');
  });
});

module.exports = router;

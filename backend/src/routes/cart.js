const express = require('express');
const router = express.Router();
const Carts = require('../models/cart');
const CartItem = require('../models/cartItem');
const connection = require('../config/database');
const Product = require('../models/product'); // Điều chỉnh đường dẫn nếu cần

// 1. Lấy tất cả các giỏ hàng
router.get('/', async (req, res) => {
  try {
    const carts = await Carts.getAll();
    res.status(200).json(carts);
  } catch (error) {
    console.error('Error fetching carts:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách giỏ hàng' });
  }
});

// 2. Lấy giỏ hàng theo ID
router.get('/:cartId', async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Carts.getById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Giỏ hàng không tồn tại' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart by ID:', error);
    res.status(500).json({ error: 'Lỗi khi lấy giỏ hàng' });
  }
});

router.post('/add-to-cart', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!user_id || !product_id || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!"
      });
    }

    // Chuyển user_id và product_id về kiểu số nếu cần
    const userId = parseInt(user_id);
    const productId = parseInt(product_id);

    if (isNaN(userId) || isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: "user_id và product_id phải là số hợp lệ!"
      });
    }

    // Kiểm tra sản phẩm có tồn tại không
    const [productResults] = await connection.execute(
      'SELECT * FROM products WHERE product_id = ?',
      [productId]
    );

    if (productResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Kiểm tra nếu giỏ hàng đã tồn tại
    let [cartResults] = await connection.execute(
      'SELECT * FROM carts WHERE user_id = ?',
      [userId]
    );

    let cartId;

    if (cartResults.length === 0) {
      // Nếu không có giỏ hàng, tạo mới
      const [cartInsertResult] = await connection.execute(
        'INSERT INTO carts (user_id) VALUES (?)',
        [userId]
      );
      cartId = cartInsertResult.insertId;
    } else {
      // Lấy ID của giỏ hàng hiện tại
      cartId = cartResults[0].cart_id;
    }

    // Kiểm tra sản phẩm trong giỏ hàng
    const [cartItems] = await connection.execute(
      'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, productId]
    );

    if (cartItems.length === 0) {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      await connection.execute(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cartId, productId, quantity]
      );
    } else {
      // Nếu sản phẩm đã có, cập nhật số lượng
      const newQuantity = cartItems[0].quantity + quantity;
      await connection.execute(
        'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
        [newQuantity, cartId, productId]
      );
    }

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully!"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while adding product to cart.",
    });
  }
});


router.get('/hihi', async()=>{
    const user_id = 19;
    const [result] = await connection.execute('SELECT * FROM carts WHERE user_id = ?', [user_id]);
    console.log(result);
})
// 4. Cập nhật giỏ hàng
router.put('/:cartId', async (req, res) => {
  const { cartId } = req.params;
  const { user_id, products } = req.body;

  if (!user_id || !products) {
    return res.status(400).json({ error: 'user_id và product_id là bắt buộc' });
  }

  try {
    const updatedRows = await Carts.update(cartId, { user_id, products });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Giỏ hàng không tồn tại' });
    }
    res.status(200).json({ message: 'Giỏ hàng đã được cập nhật' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Lỗi khi cập nhật giỏ hàng' });
  }
});

// 5. Xóa giỏ hàng
router.delete('/:cartId', async (req, res) => {
  const { cartId } = req.params;

  try {
    const deletedRows = await Carts.delete(cartId);
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Giỏ hàng không tồn tại' });
    }
    res.status(200).json({ message: 'Giỏ hàng đã được xóa' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Lỗi khi xóa giỏ hàng' });
  }
});

module.exports = router;

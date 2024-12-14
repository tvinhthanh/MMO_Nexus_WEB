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

// 2. GET route to retrieve the cart by user_id
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;  // Lấy user_id từ URL parameter

  if (!user_id) {
    return res.status(400).json({ message: "Thiếu user_id" });
  }

  const queryGetCart = `SELECT cart_id, products FROM carts WHERE user_id = ?`;

  connection.query(queryGetCart, [user_id], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
      return res.status(500).json({ message: "Lỗi khi lấy giỏ hàng" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại cho người dùng này" });
    }

    const products = results[0].products;

    if (!products) {
      return res.status(404).json({ message: "Giỏ hàng không có sản phẩm" });
    }

    let cart = [];

    try {
      if (typeof products === 'object') {
        cart = products; 
      } else {
        cart = JSON.parse(products);  
      }

      // Kiểm tra xem mảng có trống không
      if (cart.length === 0) {
        return res.status(404).json({ message: "Giỏ hàng trống" });
      }
    } catch (e) {
      console.error("Lỗi khi phân tích cú pháp giỏ hàng:", e);
      return res.status(500).json({ message: "Lỗi khi phân tích giỏ hàng. Dữ liệu không hợp lệ." });
    }

    res.status(200).json({ cart });
  });
});



router.post('/', async (req, res) => {
  // try {
    const { user_id, product_id, quantity } = req.body;

//call back
    try {
      const id = req.params.id;
      connection.query('select * from carts where user_id = ?', [user_id], (err, results) => {
        if (err) {
          console.error('Lỗi khi lấy sản phẩm:', err);
          return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: err.message });
        }
        res.status(200).json(results);

      });
  
      // connection.query('INSERT INTO carts (user_id) VALUES (?)', [user_id], (err, results) => {
      //   if (err) {
      //     console.error('Lỗi khi lấy sản phẩm:', err);
      //     return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: err.message });
      //   }
                                                                                                                                   
      //   // Trả về kết quả sản phẩm
      //   res.status(200).json(results);
      // });
    } catch (error) {
      console.error('Lỗi khi xử lý yêu cầu:', error);
      return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: error.message });
    }

    // try {
    //   const cart = await Carts.getById(cartId);
    //   if (!cart) {
    //     return res.status(404).json({ error: 'Giỏ hàng không tồn tại' });
    //   }
    //   res.status(200).json(cart);
    // } catch (error) {
    //   console.error('Error fetching cart by ID:', error);
    //   res.status(500).json({ error: 'Lỗi khi lấy giỏ hàng' });
    // }
    
    // Kiểm tra dữ liệu đầu vào
    // if (!user_id || !product_id || quantity <= 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid data provided!"
    //   });
    // }

    // Chuyển user_id và product_id về kiểu số nếu cần
    // const userId = parseInt(user_id);
    // const productId = parseInt(product_id);

    // if (isNaN(userId) || isNaN(productId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "user_id và product_id phải là số hợp lệ!"
    //   });
    // }

    

    // Kiểm tra sản phẩm có tồn tại không
    // const [productResults] = await Product.findById(productId);

    // res = await connection.execute(
    //   'INSERT INTO carts (user_id) VALUES (?)',
    //   [userId]
    // );

    // return res.status(200).json({
    //   success: true,
    //   data: res
    // });

    // if (productResults.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Product not found"
    //   });
    // }

    // // Kiểm tra nếu giỏ hàng đã tồn tại
    // let [cartResults] = await connection.execute(
    //   'SELECT * FROM carts WHERE user_id = ?',
    //   [userId]
    // );

    // let cartId;

    // if (cartResults.length === 0) {
    //   // Nếu không có giỏ hàng, tạo mới
    //   const [cartInsertResult] = await connection.execute(
    //     'INSERT INTO carts (user_id) VALUES (?)',
    //     [userId]
    //   );
    //   cartId = cartInsertResult.insertId;
    // } else {
    //   // Lấy ID của giỏ hàng hiện tại
    //   cartId = cartResults[0].cart_id;
    // }

    // // Kiểm tra sản phẩm trong giỏ hàng
    // const [cartItems] = await connection.execute(
    //   'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
    //   [cartId, productId]
    // );

    // if (cartItems.length === 0) {
    //   // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
    //   await connection.execute(
    //     'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
    //     [cartId, productId, quantity]
    //   );
    // } else {
    //   // Nếu sản phẩm đã có, cập nhật số lượng
    //   const newQuantity = cartItems[0].quantity + quantity;
    //   await connection.execute(
    //     'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
    //     [newQuantity, cartId, productId]
    //   );
    // }

    // return res.status(200).json({
    //   success: true,
    //   message: "Product added to cart successfully!"
    // });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Error occurred while adding product to cart.",
  //   });
  // }
});

// PUT route to update the cart (thêm hoặc cập nhật sản phẩm trong giỏ)
router.put("/", (req, res) => {
  const { user_id, product_id, quantity, price,product_name,image,store_id } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!user_id || !product_id || !quantity || !price) {
    return res.status(400).json({ message: "Thiếu trường bắt buộc" });
  }

  // Kiểm tra nếu quantity và price là giá trị hợp lệ
  if (isNaN(quantity) || isNaN(price)) {
    return res.status(400).json({ message: "Số lượng và giá phải là số" });
  }

  // Truy vấn lấy giỏ hàng của người dùng
  const queryGetCart = `SELECT cart_id, products FROM carts WHERE user_id = ?`;

  connection.query(queryGetCart, [user_id], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
      return res.status(500).json({ message: "Lỗi khi lấy giỏ hàng" });
    }

    let cart = [];

    // Nếu có giỏ hàng, parse dữ liệu JSON
    if (results.length > 0 && results[0].products) {
      try {
        // Nếu trường products là đối tượng JSON, sử dụng nó
        if (typeof results[0].products === 'object') {
          cart = results[0].products;
        } else {
          // Nếu là chuỗi JSON, phân tích nó
          cart = JSON.parse(results[0].products);
        }
      } catch (e) {
        console.error("Lỗi khi phân tích cú pháp giỏ hàng:", e);
        return res.status(500).json({ message: "Lỗi khi phân tích giỏ hàng" });
      }
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const productIndex = cart.findIndex((item) => item.product_id === product_id);

    if (productIndex !== -1) {
      // Nếu sản phẩm đã có, cập nhật số lượng
      cart[productIndex].quantity += quantity;  // Tăng số lượng sản phẩm
    } else {
      // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ
      const newProduct = {
        product_id,
        product_name,
        quantity,
        price,
        image,
        store_id
      };
      cart.push(newProduct); // Thêm sản phẩm mới vào giỏ hàng
    }

    // Cập nhật giỏ hàng đã thay đổi trong cơ sở dữ liệu
    const updatedCart = JSON.stringify(cart); // Chuyển giỏ hàng thành chuỗi JSON

    const queryUpdateCart = `UPDATE carts SET products = ? WHERE user_id = ?`;

    connection.query(queryUpdateCart, [updatedCart, user_id], (err, updateResults) => {
      if (err) {
        console.error("Lỗi khi cập nhật giỏ hàng:", err);
        return res.status(500).json({ message: "Lỗi khi cập nhật giỏ hàng" });
      }

      res.status(200).json({ message: "Cập nhật giỏ hàng thành công", cart });
    });
  });
});

// router.patch('/:userId/:productId', (req, res) => {
//   const { userId, productId } = req.params;
//   const { action } = req.body;  // action có thể là "increase" hoặc "decrease"

//   if (!carts[userId]) {
//     return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
//   }

//   // Cập nhật số lượng sản phẩm trong giỏ hàng
//   const productIndex = Carts[userId].findIndex(item => item.product_id === parseInt(productId));
//   if (productIndex === -1) {
//     return res.status(404).json({ message: "Sản phẩm không có trong giỏ hàng" });
//   }

//   if (action === 'increase') {
//     Carts[userId][productIndex].quantity += 1;
//   } else if (action === 'decrease' && carts[userId][productIndex].quantity > 1) {
//     Carts[userId][productIndex].quantity -= 1;
//   }

//   // Nếu số lượng sản phẩm = 0, xóa khỏi giỏ hàng
//   if (carts[userId][productIndex].quantity === 0) {
//     Carts[userId].splice(productIndex, 1);
//   }

//   res.json({ success: true, Carts: Carts[userId] });
// });
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

// // 5. Xóa giỏ hàng
// router.delete('/:cartId', async (req, res) => {
//   const { cartId } = req.params;

//   try {
//     const deletedRows = await Carts.delete(cartId);
//     if (deletedRows === 0) {
//       return res.status(404).json({ error: 'Giỏ hàng không tồn tại' });
//     }
//     res.status(200).json({ message: 'Giỏ hàng đã được xóa' });
//   } catch (error) {
//     console.error('Error deleting cart:', error);
//     res.status(500).json({ error: 'Lỗi khi xóa giỏ hàng' });
//   }
// });clear/${userId}
router.put('/clear/:userId', async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).send('user_id là bắt buộc');
    }
  
    const updateCartQuery = `
      UPDATE carts SET products = NULL WHERE user_id = ?
    `;
  
    connection.query(updateCartQuery, [userId], (err, results) => {
      if (err) {
        console.error('Lỗi khi cập nhật giỏ hàng: ', err);
        return res.status(500).send('Lỗi khi cập nhật giỏ hàng');
      }
  
      // Kiểm tra số bản ghi được cập nhật
      if (results.affectedRows === 0) {
        return res.status(404).send('Không tìm thấy giỏ hàng với user_id này');
      }
  
      // Phản hồi thành công
      res.status(200).send('Giỏ hàng đã được làm trống thành công');
    });
  });

  router.delete('/:userId/items/:productId', (req, res) => {
    const { userId, productId } = req.params;
  
    // Truy vấn để tìm giỏ hàng của người dùng
    const findCartQuery = 'SELECT * FROM carts WHERE user_id = ?';
    connection.query(findCartQuery, [userId], (err, rows) => {
      if (err) {
        console.error('Lỗi khi tìm giỏ hàng:', err);
        return res.status(500).json({ error: 'Lỗi khi tìm giỏ hàng' });
      }
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Giỏ hàng không tồn tại' });
      }
  
      const cart = rows[0];
      const products = JSON.parse(cart.products); // Giả sử cột `products` là kiểu JSON
  
      // Lọc ra sản phẩm cần xóa
      const updatedProducts = products.filter(item => item.product_id !== productId);
  
      // Cập nhật lại giỏ hàng
      const updateCartQuery = 'UPDATE carts SET products = ? WHERE user_id = ?';
      connection.query(updateCartQuery, [JSON.stringify(updatedProducts), userId], (updateErr, updateResults) => {
        if (updateErr) {
          console.error('Lỗi khi cập nhật giỏ hàng:', updateErr);
          return res.status(500).json({ error: 'Lỗi khi cập nhật giỏ hàng' });
        }
  
        res.status(200).json({ success: true, message: 'Sản phẩm đã được xóa khỏi giỏ hàng' });
      });
    });
  });
// // Route xóa sản phẩm khỏi giỏ hàng
// router.delete('/:userId/item/:productId', (req, res) => {
//   const { userId, productId } = req.params;

//   // Tìm chỉ mục của sản phẩm trong mảng JSON
//   const findIndexQuery = `
//     SELECT JSON_UNQUOTE(JSON_SEARCH(products, 'one', ?)) AS productIndex
//     FROM carts 
//     WHERE user_id = ? AND JSON_CONTAINS(products, JSON_OBJECT('product_id', ?))
//   `;

//   connection.execute(findIndexQuery, [productId, userId, productId], (err, result) => {
//     if (err) {
//       console.error('Error finding product index:', err);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }

//     if (result.length === 0 || !result[0].productIndex) {
//       return res.status(404).json({ message: 'Item not found in cart' });
//     }

//     const productIndex = result[0].productIndex;

//     // Xóa sản phẩm khỏi giỏ hàng sử dụng JSON_REMOVE
//     const updateCartQuery = `
//       UPDATE carts 
//       SET products = JSON_REMOVE(products, ?)
//       WHERE user_id = ?
//     `;

//     connection.execute(updateCartQuery, [productIndex, userId], (err, result) => {
//       if (err) {
//         console.error('Error deleting item from cart:', err);
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }

//       if (result.affectedRows > 0) {
//         return res.status(200).json({ message: 'Item removed from cart successfully' });
//       } else {
//         return res.status(404).json({ message: 'Item not found in cart' });
//       }
//     });
//   });
// });

module.exports = router;

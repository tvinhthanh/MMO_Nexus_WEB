const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL connection pool
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create the carts table if it does not exist
(async () => {
  const createCartTable = `
    CREATE TABLE IF NOT EXISTS carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id JSON,  -- Cột JSON lưu danh sách các sản phẩm trong giỏ hàng
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id_user)
    );

  `;
  try {
    await connection.execute(createCartTable);
    console.log('Table "carts" created or already exists.');
  } catch (err) {
    console.error('Error creating "carts" table:', err);
  }
})();

// Cart Model
const Carts = {
  // Get all carts
  getAll: async () => {
    const query = 'SELECT * FROM carts';
    try {
      const [results] = await connection.execute(query);
      return results;
    } catch (err) {
      console.error('Error fetching all carts:', err);
      throw err;
    }
  },

  // Get cart by specific field and value
  findOne: async (field, value) => {
    if (!field || value === undefined) {
      throw new Error('Field and value are required for findOne');
    }
    const query = `SELECT * FROM carts WHERE ${field} = ? LIMIT 1`;
    try {
      const [results] = await connection.execute(query, [value]);
      return results[0] || null;
    } catch (err) {
      console.error('Error finding cart by field:', err);
      throw err;
    }
  },

  // Get cart by ID
  getById: async (id) => {
    const query = 'SELECT * FROM carts WHERE cart_id = ?';
    try {
      const [results] = await connection.execute(query, [id]);
      return results[0] || null; // Return the single record
    } catch (err) {
      console.error('Error fetching cart by ID:', err);
      throw err;
    }
  },

  // Create a new cart
  create: async (data) => {
    if (!data.user_id) {
      throw new Error('user_id không được để trống');
    }
  
    const query = 'INSERT INTO carts (user_id) VALUES (?)';
    try {
      const [result] = await connection.execute(query, [data.user_id]);
      return result;
    } catch (err) {
      console.error('Error creating cart:', err);
      throw err;
    }
  },

  // Update cart information
  update: async (id, cartData) => {
    const query = `
      UPDATE carts
      SET user_id = ?, product_id = ?
      WHERE cart_id = ?
    `;
    const { user_id, products } = cartData;
    try {
      const [results] = await connection.execute(query, [user_id, products, id]);
      return results.affectedRows; // Return number of affected rows
    } catch (err) {
      console.error('Error updating cart:', err);
      throw err;
    }
  },

  // Delete a cart
  delete: async (id) => {
    const query = 'DELETE FROM carts WHERE cart_id = ?';
    try {
      const [results] = await connection.execute(query, [id]);
      return results.affectedRows; // Return number of affected rows
    } catch (err) {
      console.error('Error deleting cart:', err);
      throw err;
    }
  },
  save: async (cartData) => {
    if (!cartData) {
      throw new Error('cartData is required');
    }
    const { cart_id, user_id, product_id } = cartData;

    if (!user_id || !product_id) {
      throw new Error('user_id và product_id là bắt buộc');
    }

    // Kiểm tra nếu giỏ hàng đã tồn tại
    if (cart_id) {
      // Nếu giỏ hàng đã tồn tại, cập nhật giỏ hàng
      return await Carts.update(cart_id, { product_id });
    } else {
      // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
      return await Carts.create({ user_id, product_id });
    }
  },
  // Thêm sản phẩm vào giỏ hàng
  addItem: async (cartId, productId, quantity) => {
    if (!cartId || !productId || !quantity) {
      throw new Error('cartId, productId và quantity là bắt buộc');
    }

    try {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const [existingProduct] = await connection.execute(
        'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
        [cartId, productId]
      );

      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      if (existingProduct.length > 0) {
        const newQuantity = existingProduct[0].quantity + quantity;
        await connection.execute(
          'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
          [newQuantity, cartId, productId]
        );
        return { message: 'Số lượng sản phẩm đã được cập nhật trong giỏ hàng' };
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
        await connection.execute(
          'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
          [cartId, productId, quantity]
        );
        return { message: 'Sản phẩm đã được thêm vào giỏ hàng' };
      }
    } catch (err) {
      console.error('Error adding item to cart:', err);
      throw err;
    }
  },
  
};

// Export the Cart model to use in other files
module.exports = Carts;

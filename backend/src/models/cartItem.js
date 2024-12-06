// models/cartItem.js
const connection = require('../config/database'); // Đảm bảo đường dẫn đến db chính xác

const CartItem = {
    create: async (data) => {
      if (!data.cart_id || !data.product_id) {
        throw new Error('cart_id và product_id không được để trống');
      }
  
      const query = 'INSERT INTO cart_items (cart_id, product_id) VALUES (?, ?)';
      try {
        const [result] = await connection.execute(query, [data.cart_id, data.product_id]);
        return result;
      } catch (err) {
        console.error('Error creating cart item:', err);
        throw err;
      }
    },
  
    findOne: async (field, value) => {
      if (!field || value === undefined) {
        throw new Error('Field and value are required for findOne');
      }
      console.log(`Running findOne with field: ${field} and value: ${value}`);  // Debug
  
      const query = `SELECT * FROM cart_items WHERE ${field} = ? LIMIT 1`;
      try {
        const [results] = await connection.execute(query, [value]);
        return results[0] || null;
      } catch (err) {
        console.error('Error finding cart item by field:', err);
        throw err;
      }
    },
  };
  
  module.exports = CartItem;
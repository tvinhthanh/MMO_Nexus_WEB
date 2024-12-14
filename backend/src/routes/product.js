const express = require("express");
const Product = require("../models/product"); // Import model Product
const router = express.Router();
const { upload, uploadToCloudinary } = require('../middleware/upload'); // Import từ middleware
const connection = require("../config/database")

// POST route để tạo sản phẩm mới
router.post('/', upload.single('image'), async (req, res) => {
    const { product_name, price, description, stock, category_id, store_id } = req.body;
  
    // Kiểm tra thông tin đầu vào
    if (!product_name || !price || !description || !category_id || !store_id) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }
  
    try {
      // Kiểm tra nếu có file hình ảnh được tải lên
      if (!req.file) {
        return res.status(400).json({ message: 'Vui lòng tải lên một hình ảnh.' });
      }
  
      // Tải hình ảnh lên Cloudinary
      const imageUploadResult = await uploadToCloudinary(req.file);
  
      // Kiểm tra kết quả từ Cloudinary
      if (!imageUploadResult || !imageUploadResult.secure_url) {
        return res.status(500).json({ message: 'Lỗi khi tải hình ảnh lên Cloudinary.' });
      }
  
      // Lấy URL của hình ảnh đã tải lên
      const imageUrl = imageUploadResult.secure_url;
  
      // Truyền thông tin sản phẩm vào query SQL
      const query = `
        INSERT INTO products (product_name, price, description, image, stock, category_id, store_id, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
  
      // Thực thi query
      connection.query(query, [
        product_name,
        price,
        description,
        imageUrl, // Lưu URL hình ảnh trực tiếp vào cơ sở dữ liệu
        stock,
        category_id,
        store_id,
      ], (err, result) => {
        if (err) {
          console.error('Lỗi khi thêm sản phẩm:', err);
          return res.status(500).json({ message: 'Lỗi khi thêm sản phẩm', error: err });
        }
  
        res.status(201).json({
          message: 'Thêm sản phẩm thành công!',
          product_id: result.insertId, // Trả về ID của sản phẩm vừa được tạo
        });
      });
  
    } catch (error) {
      console.error('Lỗi khi tải hình ảnh lên Cloudinary:', error);
      res.status(500).json({ message: 'Lỗi khi tải hình ảnh lên Cloudinary', error: error.message });
    }
});

router.get('/search/:name', async (req, res) => {
  const { name } = req.params; // Lấy tham số "name" từ URL

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Tên sản phẩm không được để trống" });
  }
    // Thêm ký tự "%" để tìm kiếm tên sản phẩm chứa chuỗi "name"
    const searchData = `%${name}%`;
    const querySearch = `SELECT * FROM products WHERE product_name LIKE ?`;
    connection.query(querySearch, [searchData], (err, results) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json({ results });

    });
});


// Lấy tất cả sản phẩm
router.get("/", (req, res) => {
    try {
      const query = 'SELECT * FROM products';
  
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Lỗi khi lấy sản phẩm:', err);
          return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: err.message });
        }
  
        res.status(200).json(results);
      });
    } catch (error) {
      console.error('Lỗi khi xử lý yêu cầu:', error);
      return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: error.message });
    }
});

// Lấy chi tiết sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM products WHERE product_id = ?';

    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Lỗi khi lấy sản phẩm:', err);
        return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: err.message });
      }

      if (results.length > 0) {
        return res.status(200).json(results[0]);
      }

      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    });
  } catch (error) {
    console.error('Lỗi khi xử lý yêu cầu:', error);
    return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', error: error.message });
  }
});

// Lấy tất cả sản phẩm theo store_id
router.get('/store/:storeId', (req, res) => {
    const storeId = req.params.storeId;
  
    if (!storeId) {
      return res.status(400).json({ message: 'storeId không hợp lệ.' });
    }
  
    try {
      const query = 'SELECT * FROM products WHERE store_id = ?';
  
      connection.query(query, [storeId], (err, results) => {
        if (err) {
          console.error('Lỗi khi lấy sản phẩm:', err);
          return res.status(500).json({ message: 'Lỗi server khi lấy sản phẩm', error: err.message });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: 'Không có sản phẩm cho storeId này' });
        }
  
        res.json(results);
      });
    } catch (error) {
      console.error('Lỗi khi xử lý yêu cầu:', error);
      return res.status(500).json({ message: 'Lỗi khi xử lý yêu cầu', error: error.message });
    }
});

// Cập nhật thông tin sản phẩm
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { product_name, category_id, store_id, price, stock, description, image } = req.body;

    if (!product_name || !category_id || !store_id || price <= 0 || stock < 0 || !image) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin sản phẩm." });
    }

    const productData = {
      product_name,
      category_id,
      store_id,
      price,
      stock,
      description,
      image,
    };

    const affectedRows = await Product.update(productId, productData);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    res.status(200).json({ message: "Sản phẩm đã được cập nhật thành công." });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại." });
  }
});

// Xóa sản phẩm theo ID
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const affectedRows = await Product.delete(productId);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    res.status(200).json({ message: "Sản phẩm đã được xóa thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ message: "Có lỗi xảy ra. Vui lòng thử lại." });
  }
});



module.exports = router;

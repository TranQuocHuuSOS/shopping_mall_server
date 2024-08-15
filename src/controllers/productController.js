const asyncHandler= require("async-handler");
const ProductModel= require("../models/productModel");
const asyncHandle= require("express-async-handler");
require('dotenv').config();
// Tạo mới sản phẩm, mặt hàng
const createNewProduct =asyncHandle(async(req, res)=>{
    const {title,description, discount_percentage,original_price, discounted_price  } = req.body;
    if(!title || !original_price || ! discounted_price ){
        res.status(400);
        throw new Error("Please provide all required fields:title, original_price, discounted_price");
    }
    const newProduct = new ProductModel({
        title, description, discount_percentage,original_price, discounted_price
    })
    const savedProduct=  await newProduct.save();
    res.status(201).json({
        message:"Product created successfully!!!",
        data: savedProduct,
    });
});
// cập nhật lại thông tin sản phẩm , mặt hàng bất kì

const updateProduct = asyncHandle(async(req, res)=>{
    const {id}= req.params;
    console.log("id cần chỉnh", id);
    
    const {title, description, discount_percentage, original_price, discounted_price}= req.body;
    const product = await ProductModel.findById(id);
    if(!product){
        res.status(404);
        throw new Error("Product not found!!!");
    }
    product.title= title || product.title;
    product.description= description || product.description;
    product.discount_percentage= discount_percentage || product.discount_percentage;
    product.original_price = original_price || product.original_price;
    product.discounted_price= discounted_price || product.discounted_price;
    product.updatedAt= Date.now();

    const updatedProduct = await product.save();
    res.status(200).json({
        message:"Product updated successfully!!!",
        data:updatedProduct,
    });
})
// remove bất kì 1 sản phẩm nào 
const deleteProduct = asyncHandle(async(req, res)=>{
    const {id}= req.params;
    console.log("id cần xóa", id);
    const product = await ProductModel.findById(id);
    if(!product){
        res.status(404);
        throw new Error("Product not found!!!");
    }
    await ProductModel.deleteOne({_id:id});
    res.status(200).json({
        message:"Product deleted successfully!!!",
        data:product,
    })
})

// lấy tất cả danh sách sản phẩm
const getAllProduct = asyncHandle(async(req, res)=>{
    const products= await ProductModel.find({});
    res.status(200).json({
        message:"Products retrieved successfully!!!",
        data: products,
    })
})

// lấy chi tiết sản phẩm
const getDetailProduct = asyncHandle(async(req, res)=>{
    const {id}= req.params;
    console.log("id cần lấy chi tiết", id);
    const product = await ProductModel.findById(id);
    if(!product){
        res.status(404);
        throw new Error("Product not found!!!");
    }
    res.status(200).json({
        message:"Product retrieved detail successfully!!!",
        data:product,
    })
})
module.exports= {createNewProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct};
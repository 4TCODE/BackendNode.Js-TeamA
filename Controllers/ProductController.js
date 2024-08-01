const Product = require('../Models/Product')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
const slugify = require('slugify');
class ProductController {


    static createProduct = asyncHandler(async (req, res, next) => {
        const slug = slugify(req.body.title, {
            lower: true, // Convert to lowercase
            strict: true // Remove special characters
        });
        const product = await Product.create({
            title: req.body.title,      
            stock: req.body.stock,  
            price: req.body.price,
            colors : req.body.colors , 
            slug : slug 
          
        })
        if (product == null) return next(new ApiError("Failed to create This product ", 500))
        res.status(201).json({ "message": "Product Created Succesfully ", data: product })

    })
    static getProducts = asyncHandler(async (req, res, next) => {
        const limit = parseInt(req.query.limit || 5, 10); // Ensure numeric limit
        const page = Math.max(1, parseInt(req.query.page || 1, 10)); // Handle negative or zero page
        const skip = (page - 1) * limit;
        //const products = await Product.find().skip(skip).limit(limit).populate({path : "Category" , selected :"name"});
        const products = await Product.find().skip(skip).limit(limit);

        if (products == null) return next(new ApiError("No Product List", 404));
        res.status(200).json({ result: products.length, "data": products })
    })
    static getProductById = asyncHandler(async (req, res, next) => { // product id 
        const product = await Product.findById(req.params.id);
        if (product == null) return next(new ApiError("No Product with this id", 404));
        res.status(200).json(product)
    })
    static updateProduct = asyncHandler(async (req, res, next) => {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.title,      
                stock: req.body.stock,  
                price: req.body.price,
                colors : req.body.colors
            },
            { new: true })
        if (!product) { return next(new ApiError(`No product for this id ${req.params.id}`, 404)); }
        res.status(201).json({ "message": "product Updated Succesfully ", data: product })

    })
    static deleteProduct = asyncHandler(async (req, res, next) => {
        const product = await Product.findOneAndDelete({ _id: req.params.id })
        if (product == null) { return next(new ApiError(`No product for this id ${req.params.id}`, 404)); }
        res.status(204).json({ "message": "product deleted successfully " })
    })
}

module.exports = { ProductController }
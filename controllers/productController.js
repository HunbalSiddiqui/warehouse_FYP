const Product = require("../models/productModel");

exports.createProduct = async (req, res, next) => {
    try {
        // check if product exists
        var product = await Product.findOne({ name: req.body.name })
        if (product) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This product already exists in the system.",
            });
        }

        product = await Product.create(req.body)

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                product,
            },
        })

    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        var product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "product does not exist.",
            });
        }
        product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                product
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        var products = await Product.find();

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                products
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        var product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "product does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                product
            },
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}
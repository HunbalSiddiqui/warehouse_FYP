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
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        var products = await Product.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await Product.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
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
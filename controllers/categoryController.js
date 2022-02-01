const Category = require("../models/categoryModel");

exports.createCategory = async (req, res, next) => {
    try {
        // check if category exists
        var category = await Category.findOne({ name: req.body.name })
        if (category) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "This category already exists in the system.",
            });
        }

        category = await Category.create(req.body)

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                category,
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

exports.updateCategory = async (req, res, next) => {
    try {
        var category = await Category.findOne({ _id: req.params.id });
        if (!category) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "category does not exist.",
            });
        }
        category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                category
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

exports.getCategories = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        var categories = await Category.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await Category.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
            data: {
                categories
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

exports.getCategory = async (req, res, next) => {
    try {
        var category = await Category.findOne({ _id: req.params.id });
        if (!category) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "category does not exist.",
            });
        }
        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                category
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
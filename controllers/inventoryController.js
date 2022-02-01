const Inventory = require("../models/inventoryModel");
const ExcelJS = require("exceljs")

exports.getInventory = async (req, res, next) => {
    try {
        let inventory = await Inventory.findOne({ _id: req.params.id })

        if (!inventory) {
            return res.status(404).json({
                status: "error",
                success: false,
                error: "Inventory does not exist.",
            });
        }

        return res.status(200).json({
            success: true,
            status: "success",
            data: {
                inventory
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

exports.getInventories = async (req, res, next) => {
    try {
        var { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        var skip = (page - 1) * limit;

        let inventories = await Inventory.find().skip(skip).limit(limit);
        var totalPages, totalCount;
        if (limit > 0) {
            totalCount = await Inventory.countDocuments()
            totalPages = Math.ceil(totalCount / limit);
        }

        return res.status(200).json({
            success: true,
            status: "success",
            pages: totalPages,
            count: totalCount,
            data: {
                inventories
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

exports.exportInventory = async (req, res, next) => {
    try {
        let workbook = new ExcelJS.Workbook();

        let worksheet = workbook.addWorksheet("Inventory");
        const getColumnsConfig = (columns) =>
            columns.map((column) => ({ header: column, width: Math.ceil(column.length * 1.5), outlineLevel: 1 }));

        worksheet.columns = getColumnsConfig([
            "PRODUCT NAME",
            "CUSTOMER",
            "WAREHOUSE",
            "UOM",
            "AVAILABLE QUANTITY",
            "COMMITTED QUANTITY",
            "DISPATCHED QUANTITY",
        ]);

        let inventories = await Inventory.find()

        worksheet.addRows(
            inventories.map((inv) => [
                inv.Product.name,
                inv.Company.name,
                inv.Warehouse.name,
                inv.Product.uomId.name,
                inv.availableQuantity,
                inv.committedQuantity,
                inv.dispatchedQuantity,
            ])
        );

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=" + "Inventory.xlsx");

        await workbook.xlsx.write(res).then(() => res.end());
    } catch (error) {
        res.status(404).json({
            status: "error",
            success: false,
            error: error.message,
        });
    }
}
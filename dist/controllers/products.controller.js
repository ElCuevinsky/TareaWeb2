"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePrice = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getById = exports.getAll = void 0;
const dbConnection_1 = __importDefault(require("../conf/dbConnection"));
const validId = (id) => {
    const numberId = Number(id);
    return Number.isInteger(numberId) && numberId > 0;
};
const getAll = async (req, res) => {
    try {
        const [rows] = await dbConnection_1.default.query(`
            SELECT *
            FROM products
            WHERE active = ?
            `, [true]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error("Error al consultar productos:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
exports.getAll = getAll;
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validId(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }
        const [rows] = await dbConnection_1.default.query(`
            SELECT *
            FROM products
            WHERE id = ?
            AND active = TRUE
            `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error("Error al consultar producto:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
exports.getById = getById;
const createProduct = async (req, res) => {
    try {
        const { name, price, stock, description, brand, img } = req.body;
        if (!name ||
            !description ||
            !Number.isFinite(Number(price)) ||
            Number(price) <= 0 ||
            !Number.isInteger(Number(stock)) ||
            Number(stock) < 0) {
            return res.status(400).json({
                message: "Datos invalidos"
            });
        }
        const [result] = await dbConnection_1.default.query(`
            INSERT INTO products
            (
                name,
                price,
                stock,
                description,
                brand,
                img
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `, [
            name,
            price,
            stock,
            description,
            brand,
            img
        ]);
        res.status(201).json({
            message: "Producto creado correctamente",
            id: result.insertId
        });
    }
    catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, description, brand, img } = req.body;
        if (!validId(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }
        if (!name ||
            !description ||
            !Number.isFinite(Number(price)) ||
            Number(price) <= 0 ||
            !Number.isInteger(Number(stock)) ||
            Number(stock) < 0) {
            return res.status(400).json({
                message: "Datos invalidos"
            });
        }
        const [result] = await dbConnection_1.default.query(`
            UPDATE products
            SET
                name = ?,
                price = ?,
                stock = ?,
                description = ?,
                brand = ?,
                img = ?
            WHERE id = ?
            AND active = TRUE
            `, [
            name,
            price,
            stock,
            description,
            brand,
            img,
            id
        ]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }
        res.status(200).json({
            message: "Producto actualizado correctamente"
        });
    }
    catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validId(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }
        const [result] = await dbConnection_1.default.query(`
            UPDATE products
            SET active = FALSE
            WHERE id = ?
            AND active = TRUE
            `, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }
        res.status(200).json({
            message: "Producto dado de baja correctamente"
        });
    }
    catch (error) {
        console.error("Error al dar de baja el producto:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
exports.deleteProduct = deleteProduct;
const changePrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { price } = req.body;
        if (!validId(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }
        if (!Number.isFinite(Number(price)) ||
            Number(price) <= 0) {
            return res.status(400).json({
                message: "Precio invalido"
            });
        }
        const [result] = await dbConnection_1.default.query(`
            UPDATE products
            SET price = ?
            WHERE id = ?
            AND active = TRUE
            `, [price, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }
        res.status(200).json({
            message: "Precio actualizado correctamente"
        });
    }
    catch (error) {
        console.error("Error al cambiar el precio:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
exports.changePrice = changePrice;

import { Request, Response } from "express";

import pool from "../conf/dbConnection";


const validId = (id: string): boolean => {

    const numberId = Number(id);

    return Number.isInteger(numberId) && numberId > 0;

};


export const getAll = async (
    req: Request,
    res: Response
) => {

    try {

        const [rows] = await pool.query(

            `
            SELECT *
            FROM products
            WHERE active = ?
            `,

            [true]

        );


        res.status(200).json(rows);

    } catch (error) {

        console.error(
            "Error al consultar productos:",
            error
        );


        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};


export const getById = async (
    req: Request<{ id: string }>,
    res: Response
) => {

    try {

        const { id } = req.params;


        if (!validId(id)) {

            return res.status(400).json({
                message: "ID invalido"
            });

        }


        const [rows]: any = await pool.query(

            `
            SELECT *
            FROM products
            WHERE id = ?
            AND active = TRUE
            `,

            [id]

        );


        if (rows.length === 0) {

            return res.status(404).json({
                message: "Producto no encontrado"
            });

        }


        res.status(200).json(rows[0]);

    } catch (error) {

        console.error(
            "Error al consultar producto:",
            error
        );


        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};
export const createProduct = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            name,
            price,
            stock,
            description,
            brand,
            img
        } = req.body;


        if (
            !name ||
            !description ||
            !Number.isFinite(Number(price)) ||
            Number(price) <= 0 ||
            !Number.isInteger(Number(stock)) ||
            Number(stock) < 0
        ) {

            return res.status(400).json({
                message: "Datos invalidos"
            });

        }


        const [result]: any = await pool.query(

            `
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
            `,

            [
                name,
                price,
                stock,
                description,
                brand,
                img
            ]

        );


        res.status(201).json({

            message: "Producto creado correctamente",

            id: result.insertId

        });

    } catch (error) {

        console.error(
            "Error al crear producto:",
            error
        );


        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};
export const updateProduct = async (
    req: Request<{ id: string }>,
    res: Response
) => {

    try {

        const { id } = req.params;

        const {
            name,
            price,
            stock,
            description,
            brand,
            img
        } = req.body;


        if (!validId(id)) {

            return res.status(400).json({
                message: "ID invalido"
            });

        }


        if (
            !name ||
            !description ||
            !Number.isFinite(Number(price)) ||
            Number(price) <= 0 ||
            !Number.isInteger(Number(stock)) ||
            Number(stock) < 0
        ) {

            return res.status(400).json({
                message: "Datos invalidos"
            });

        }


        const [result]: any = await pool.query(

            `
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
            `,

            [
                name,
                price,
                stock,
                description,
                brand,
                img,
                id
            ]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Producto no encontrado"
            });

        }


        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {

        console.error(
            "Error al actualizar producto:",
            error
        );


        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};
export const deleteProduct = async (
    req: Request<{ id: string }>,
    res: Response
) => {

    try {

        const { id } = req.params;


        if (!validId(id)) {

            return res.status(400).json({
                message: "ID invalido"
            });

        }


        const [result]: any = await pool.query(

            `
            UPDATE products
            SET active = FALSE
            WHERE id = ?
            AND active = TRUE
            `,

            [id]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Producto no encontrado"
            });

        }


        res.status(200).json({
            message: "Producto dado de baja correctamente"
        });

    } catch (error) {

        console.error(
            "Error al dar de baja el producto:",
            error
        );


        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};
export const changePrice = async (
    req: Request<{ id: string }>,
    res: Response
) => {

    try {

        const { id } = req.params;
        const { price } = req.body;


        if (!validId(id)) {

            return res.status(400).json({
                message: "ID invalido"
            });

        }


        if (
            !Number.isFinite(Number(price)) ||
            Number(price) <= 0
        ) {

            return res.status(400).json({
                message: "Precio invalido"
            });

        }


        const [result]: any = await pool.query(

            `
            UPDATE products
            SET price = ?
            WHERE id = ?
            AND active = TRUE
            `,

            [price, id]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Producto no encontrado"
            });

        }


        res.status(200).json({
            message: "Precio actualizado correctamente"
        });

    } catch (error) {

        console.error(
            "Error al cambiar el precio:",
            error
        );


        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};
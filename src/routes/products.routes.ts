import { Router } from "express";

import {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct,
    changePrice
} from "../controllers/products.controller";

const router = Router();


router.get(
    "/getAll",
    getAll
);


router.get(
    "/getById/:id",
    getById
);


router.post(
    "/create",
    createProduct
);


router.put(
    "/update/:id",
    updateProduct
);


router.delete(
    "/delete/:id",
    deleteProduct
);

router.put(
    "/changePrice/:id",
    changePrice
);
router.patch(
    "/change-price/:id",
    changePrice
);


export default router;
import { Router } from "express";
const router = Router();

router.get("*", (req, res) => {
    res.status(404).json({
        'code': 404,
        'message': "route not found",     
    });
});

export default router;
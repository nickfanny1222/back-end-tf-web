import { Router } from "express";
import jwt from "jsonwebtoken";
import autenticar from "../db/index.js";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        const usuario = await autenticar(req.body.email, req.body.senha);
        if (usuario !== undefined) {
            const token = jwt.sign({ user: usuario.id }, process.env.KEY, {
                expiresIn: 300,
            });
            
            res.status(202).json({ token: token });
        } 
        
        else res.status(404).json({ message: "Email ou senha incorretos!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

export default router;
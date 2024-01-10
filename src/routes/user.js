import { Router } from "express";
const router = Router();

import {
    selectUser,
    selectUsers,
    insertUser,
    deleteUser,
    updateUser,
    loginUser
} from "../db/user.js";
  
import autenticacao from "../middlewares/autenticacao.js";

router.post("/user/login", async (req, res) => {
    try {
        const user = await loginUser(req.body);

        if (user.length > 0) res.json(user[0]);

        else res.status(404).json({ message: "Email ou senha incorretos!" });
    } 
    
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Erro!" });
    }
});

router.get("/user", autenticacao, async (req, res) => {
    try {
        const users = await selectUsers();
        res.json(users);
    } 
    
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Erro!" });
    }
});

router.post("/user", autenticacao, async (req, res) => {
    try {
        const id = await insertUser(req.body);

        if (id === undefined) throw new Error("an error has ocurred");

        res.status(201).json({ message: "Usuário cadastrado com sucesso!", id: id });
    } 
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.get("/user/:id", autenticacao, async (req, res) => {
    try {
        const user = await selectUser(req.params.id);

        if (user.length > 0) res.json(user[0]);

        else res.status(404).json({ message: "Usuário não encontrado!" });
    } 
    
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Erro!" });
    }
});

router.delete("/user/:id", autenticacao, async (req, res) => {
    try {
        if (req.params.id == 1) throw new Error("the administrator user cannot be deleted");

        await deleteUser(req.params.id);
        res.status(200).json({ message: "Usuário excluido com sucesso!" });
    } 
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.put("/user/:id", autenticacao, async (req, res) => {
    try {
        const usuario = await selectUser(req.params.id);

        if (usuario.length > 0) {
            await updateUser(req.params.id, req.body);
            res.status(200).json({ message: "Usuário atualizado com sucesso!" });
        }
        
        else res.status(404).json({ message: "Usuário não encontrado!" });
    }
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

export default router;
import { Router } from "express";
const router = Router();

import {
    selectHability,
    selectHabilityByUser,
    insertHability,
    deleteHability,
    updateHability
} from "../db/hability.js";
  
import autenticacao from "../middlewares/autenticacao.js";

router.post("/hability", autenticacao, async (req, res) => {
    try {
        const id = await insertHability(req.body);

        if (id === undefined) throw new Error("an error has ocurred");

        res.status(201).json({ message: "Habilidade cadastrado com sucesso!", id: id });
    } 
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.delete("/hability/:id", autenticacao, async (req, res) => {
    try {
        await deleteHability(req.params.id);
        res.status(200).json({ message: "Habilidade excluida com sucesso!" });
    } 
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.put("/hability/:id", autenticacao, async (req, res) => {
    try {
        const hability = await selectHability(req.params.id);

        if (hability.length > 0) {
            await updateHability(req.params.id, req.body);
            res.status(200).json({ message: "Habilidade atualizada com sucesso!" });
        }
        
        else res.status(404).json({ message: "Habilidade não encontrada!" });
    }
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.get("/user/:id/hability", autenticacao, async (req, res) => {
    try {
        const hability = await selectHabilityByUser(req.params.id);
        res.json(hability);
    } 
    
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Erro!" });
    }
});

export default router;
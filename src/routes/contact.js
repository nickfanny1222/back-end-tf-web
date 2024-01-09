import { Router } from "express";
const router = Router();

import {
    selectContact,
    selectContactByUser,
    insertContact,
    deleteContact,
    updateContact
} from "../db/contact.js";
  
import autenticacao from "../middlewares/autenticacao.js";

router.post("/contact", autenticacao, async (req, res) => {
    try {
        const id = await insertContact(req.body);

        if (id === undefined) throw new Error("an error has ocurred");

        res.status(201).json({ message: "Contato cadastrado com sucesso!", id: id });
    } 
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.delete("/contact/:id", autenticacao, async (req, res) => {
    try {
        await deleteContact(req.params.id);
        res.status(200).json({ message: "Contato excluido com sucesso!" });
    } 
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.put("/contact/:id", autenticacao, async (req, res) => {
    try {
        const contact = await selectContact(req.params.id);

        if (contact.length > 0) {
            await updateContact(req.params.id, req.body);
            res.status(200).json({ message: "Contato atualizado com sucesso!" });
        }
        
        else res.status(404).json({ message: "Contato não encontrado!" });
    }
    
    catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.get("/user/:id/contact", autenticacao, async (req, res) => {
    try {
        const contact = await selectContactByUser(req.params.id);
        res.json(contact);
    } 
    
    catch (err) {
        res.status(err.status || 500).json({ message: err.message || "Erro!" });
    }
});

export default router;
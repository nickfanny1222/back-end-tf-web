import jwt from "jsonwebtoken";

function autenticacao(req, res, next) {
    const token = req.headers["token"];

    jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Usuário não autenticado" }).end();

        req.userId = decoded.user;
        next();
    });
}

export default autenticacao;
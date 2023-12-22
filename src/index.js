import dotenv from "dotenv";
dotenv.config();

import express from "express";
import defaultRouter from "./routes/default.js";
import habilityRouter from "./routes/hability.js";
import userRouter from "./routes/user.js";
import loginRouter from "./routes/login.js";

const app = express();              
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(habilityRouter);
app.use(loginRouter);
app.use(defaultRouter);

app.listen(port, () => {
    console.log(`Server on`);
});
import connect from './connection.js';

async function autenticar(email, senha) {
    let client = await connect();
    const query = "SELECT * FROM usuario WHERE email = $1 AND senha = $2";
    const usuario = [email, senha];
    const res = await client.query(query, usuario);
    return res.rows[0];
}

export default autenticar;
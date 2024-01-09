import connect from "./connection.js";

async function selectUser(id) {
    const client = await connect();
    const query = "SELECT * FROM usuario WHERE id = $1";
    const usuario = [id];
    const res = await client.query(query, usuario);
    return res.rows;
}

async function selectUsers() {
    const client = await connect();
    const res = await client.query("SELECT * FROM usuario");
    return res.rows;
}

async function deleteUser(id) {
    const client = await connect();
    const query = "DELETE FROM usuario WHERE id = $1";
    await client.query(query, [id]);
}

async function insertUser(data) {
    const client = await connect();
    const query = "INSERT INTO usuario (nome, email, senha, ativo, nome_completo, curso, estado, telefone, profile_image) VALUES ($1, $2 ,$3, $4, $5, $6, $7, $8, $9) RETURNING ID";
    const usuario = [data.nome, data.email, data.senha, data.ativo, data.nome_completo, data.curso, data.estado, data.telefone, data.profile_image];
    const res = await client.query(query, usuario);
    return res.rows[0].id || undefined;
}

async function updateUser(id, data) {
    const client = await connect();
    const query = "UPDATE usuario SET nome = $1, email = $2, senha = $3, ativo = $4, nome_completo = $5, curso = $6, estado = $7, telefone = $8, profile_image = $9 WHERE id = $10";
    const usuario = [data.nome, data.email, data.senha, data.ativo, data.nome_completo, data.curso, data.estado, data.telefone, data.profile_image, id];
    await client.query(query, usuario);
}

export { selectUsers, insertUser, deleteUser, selectUser, updateUser };
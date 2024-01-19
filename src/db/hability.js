import connect from "./connection.js";


async function selectHability(id) {
    const client = await connect();
    const query = "SELECT * FROM habilidade WHERE id = $1";
    const habilidade = [id];
    const res = await client.query(query, habilidade);
    client.end();
    return res.rows;
}

async function selectHabilityByUser(id) {
    const client = await connect();
    const query = "SELECT * FROM habilidade WHERE usuario = $1";
    const habilidade = [id];
    const res = await client.query(query, habilidade);
    client.end();
    return res.rows;
}

async function deleteHability(id) {
    const client = await connect();
    const query = "DELETE FROM habilidade WHERE id = $1";
    await client.query(query, [id]);
    client.end();
}

async function insertHability(data) {
    const client = await connect();
    const query = "INSERT INTO habilidade (usuario, titulo, descricao) VALUES ($1, $2 ,$3) RETURNING ID";
    const habilidade = [data.usuario, data.titulo, data.descricao];
    const res = await client.query(query, habilidade);
    client.end();
    return res.rows[0].id || undefined;
}

async function updateHability(id, data) {
    const client = await connect();
    const query = "UPDATE habilidade SET usuario = $1, titulo = $2, descricao = $3 WHERE id = $4";
    const habilidade = [data.usuario, data.titulo, data.descricao, id];
    await client.query(query, habilidade);
    client.end();
}

export { selectHability, selectHabilityByUser, insertHability, deleteHability, updateHability };
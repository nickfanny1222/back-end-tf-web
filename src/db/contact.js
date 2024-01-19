import connect from "./connection.js";

async function selectContact(id) {
    const client = await connect();
    const query = "SELECT * FROM contato WHERE id = $1";
    const contato = [id];
    const res = await client.query(query, contato);
    client.end();
    return res.rows;
}

async function selectContactByUser(id) {
    const client = await connect();
    const query = "SELECT * FROM contato WHERE usuario = $1";
    const contato = [id];
    const res = await client.query(query, contato);
    client.end();
    return res.rows;
}

async function deleteContact(id) {
    const client = await connect();
    const query = "DELETE FROM contato WHERE id = $1";
    await client.query(query, [id]);
    client.end();
}

async function insertContact(data) {
    const client = await connect();
    const query = "INSERT INTO contato (usuario, nome, link) VALUES ($1, $2 ,$3) RETURNING ID";
    const contato = [data.usuario, data.nome, data.link];
    const res = await client.query(query, contato);
    client.end();
    return res.rows[0].id || undefined;
}

async function updateContact(id, data) {
    const client = await connect();
    const query = "UPDATE contato SET usuario = $1, titulo = $2, descricao = $3 WHERE id = $4";
    const contato = [data.usuario, data.nome, data.link, id];
    await client.query(query, contato);
    client.end();
}

export { selectContact, selectContactByUser, insertContact, deleteContact, updateContact };
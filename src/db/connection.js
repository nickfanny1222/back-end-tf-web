import pkg from "pg";
const { Pool } = pkg;

async function connect() {
    const pool = new Pool({
        connectionString: process.env.URL_BD,
    });

    return pool.connect();
}

export default connect;
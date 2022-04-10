module.exports = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_HOST,
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}
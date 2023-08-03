const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const { fetchCountriesHandler } = require("./src/handlers/FetchCountriesHandler")


conn.sync({ force: false }).then(async () => {
await fetchCountriesHandler() // Guardamos los datos de la API en nuestra base de datos
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error.message))

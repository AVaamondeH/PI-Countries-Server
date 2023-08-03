const axios = require("axios");
const { DATA_URL } = process.env;
const { Country } = require("../db")

const fetchCountries = async () => {
    
    const { data } = await axios(DATA_URL) // Se hace la peticion a la API y se desestructura la data que devuelve axios para trabajarla
    if (await Country.count() > 0) {   
        return;
    }
    await Promise.all(  //Se usa este metodo para esperar que se revuelvan todas las promesas que retorne el map
        data.map(async (country) => {
            let {cca3, name, flags, continents, capital, subregion, area, population } = country
            if(!capital) capital = ["unknown"]
            await Country.create({
                id: cca3,
                name: name.common,
                flagImg: flags.png,
                continent: continents[0],
                capital: capital[0],
                subregion,
                area,
                population,
            });
        })
    );   
}

module.exports ={ 
    fetchCountries
};
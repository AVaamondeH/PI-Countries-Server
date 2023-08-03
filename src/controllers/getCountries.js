const { Country } = require("../db")

const getCountries = async () => {

        const countries = await Country.findAll()
        //Use sort para devolver los paises ordenados alfabeticamente
        countries.sort((country1, country2) => {
            //El metodo localeCompare compara cadenas de texto
            return country1.name.localeCompare(country2.name);
        })
        return countries    
}

module.exports ={ 
    getCountries
};
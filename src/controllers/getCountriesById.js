const { Country, Activity } = require("../db")

const getCountriesById = async (idPais) => {

        const country = await Country.findOne({ //utilizamos findOne para una busqueda mas especifica
            where: { 
                id: idPais 
            },
            //Incluimos sus respectivas activdades
            include: Activity
        }) //se busca en la database

        return country //se retorna el pais

}


module.exports ={ 
    getCountriesById
};
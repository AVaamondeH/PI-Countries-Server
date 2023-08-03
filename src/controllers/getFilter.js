const { Country, Activity } = require("../db")
const { getCountries } = require("./getCountries")
const { Op } = require("sequelize");

const getFilter = async (continent, activity) => {

    const continentFilter = async (continent) => {
        if(continent === "All") {
            const countries = await getCountries()
                return countries 
        }

        const countries = await Country.findAll({
            where : {
                continent: {
                    // Use el operador para que no importara si esta en minus o mayus aunque eso se controla en el front no esta demas verificar
                    [Op.iLike]: `${continent}`
                }
            }
        })
                //Use sort para devolver los paises ordenados alfabeticamente
                countries.sort((country1, country2) => {
                //El metodo localeCompare compara cadenas de texto
                return country1.name.localeCompare(country2.name);
            })
            return countries 
    }
    
    if (continent && !activity) {
        const response = await continentFilter(continent)
        return response
    }

    if (!continent && activity) {
        const activities = await Activity.findAll({
            where : {
                name: {
                    // Use el operador para que no importara si esta en minus o mayus aunque eso se controla en el front no esta demas verificar
                    [Op.iLike]: `${activity}`
                },
            },
            
            include: Country
        })

        if (!activities.length) return activities

        return activities[0].Countries
    }

    if (continent && activity) {
        const countries = await continentFilter(continent)

        // Obtener solo los ids de los países filtrados
        const countryIds = countries.map((country) => country.id);

        const activities = await Activity.findAll({
            where: {
                name: {
                    [Op.iLike]: `${activity}`
                }
            },
            include: {
                model: Country,
                where: {
                    id: countryIds // Limitar la búsqueda de actividades solo en los países filtrados por continente
                }
            }
        });
        
        if (!activities.length) return activities

        return activities[0].Countries;
    }

}

module.exports ={ 
    getFilter
};

/** Se contemplan las 3 opciones que son filtrado por continente por actividad o por ambos 
 * En el primer caso se buscan los paises por el contienente solicitado y se retorna
 * En el segundo caso se busca las actividades solicitadas y se devuelven las actividades mas los paises asociadas a la misma
 * En el ultimo caso se busca el contiente solicitado luego le extraigo los id para proceder a buscar las actividades solicitadas
 * donde le paso como parametro al include los ID de los paises del cotinente que se pide filtrar
 */
const { Country } = require("../db")
const { Op } = require("sequelize");

const getCountriesByName =  async (name) => {

        const country = await Country.findAll({
            where: {
                name: {
                    // Use el operador para que no importara si esta en minus o mayus
                    [Op.iLike]: `${name}%`
                }
            }
        })
        
        return country
}

module.exports ={ 
    getCountriesByName
};
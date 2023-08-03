const { getCountriesById } = require("../controllers/getCountriesById")

const getCountriesByIdHandler = async (req, res) => {
    try {
        const { idPais } = req.params //Sacamos de params el id del pais
        const response = await getCountriesById(idPais)
        if(!response) throw Error("Not Found")

        return res.status(200).json(response) //se retorna el pais
    
    } catch (error) {
        if(error.message === "Not found") return res.status(404).send({error: error.message})
        return res.status(500).send({error: error.message})
    }
}


module.exports ={ 
    getCountriesByIdHandler
};
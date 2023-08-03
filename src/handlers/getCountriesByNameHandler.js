const {getCountriesByName} = require("../controllers/getCountriesByName")

const getCountriesByNameHandler =  async (req, res) => {
    try {
        const { name } = req.query
        
        if (!name) throw Error("Name parameter is missing or empty");

        const response = await getCountriesByName(name)

        if(!response.length) throw Error("Not found")

        return res.status(200).json(response)
        
    } catch (error) {
        if(error.message === "Not found") return res.status(404).send({error: error.message})
        return res.status(500).send({error: error.message})
    }
}

module.exports ={ 
    getCountriesByNameHandler
};
const { getActivities } = require("../controllers/getActivities")

const getActivitiesHandler = async (req, res) => {
    try {
        const response = await getActivities()
        if(!response) throw Error("Service unavailable")
        return res.status(200).json(response) //se retorna el pais
    
    } catch (error) {
        if(error.message === "Service unavailable") return res.status(503).send({error: error.message})
        return res.status(500).send({error: error.message})
    }
}


module.exports ={ 
    getActivitiesHandler
};
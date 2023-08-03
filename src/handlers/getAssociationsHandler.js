const { getAssociations } = require("../controllers/getAssociations")
const { responseObj } = require("./response")

const getAssociationsHandler = async (req, res) => {
    try {
        const response = await getAssociations()
        if(!response) throw Error("Service unavailable")
        return res.status(200).json(responseObj("Request fulfilled successfully", response)) //se retorna el pais
    
    } catch (error) {
        if(error.message === "Service unavailable") return res.status(503).send(responseObj(error.message))
        return res.status(500).send(responseObj(error.message))
    }
}


module.exports ={ 
    getAssociationsHandler
};
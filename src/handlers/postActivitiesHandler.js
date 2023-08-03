const { postActivities } = require("../controllers/postActivities")

const postActivitiesHandler = async (req, res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body
        
        if (!name || !difficulty || !duration || !season || !countries.length) throw Error("Faltan datos")
        response = await postActivities(name, difficulty, duration, season, countries)
        if (!response) throw Error("Error saving the activity")
        return res.status(200).json(response)

    } catch (error) {
        if (error.message === "Faltan datos") return res.status(400).json({error: error.message})
        return res.status(500).json({error: error.message}) 
    }
}

module.exports = {
    postActivitiesHandler
}

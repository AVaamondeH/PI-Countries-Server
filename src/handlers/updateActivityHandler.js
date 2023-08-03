const { updateActivityById } = require("../controllers/updateActivity");
const { responseObj } = require("./response");


const updateActivityHandler = async (req, res) => {
    try {
        const { id, name, difficulty, duration, season, countries } = req.body

        if (!id || !name || !difficulty || !duration || !season || !countries.length) throw Error("Missing data")
        response = await updateActivityById(id, name, difficulty, duration, season, countries)
        if (!response) throw Error("Error updating the activity")
        return res.status(200).json(responseObj("Activity updated successfully", response))

    } catch (error) {
        if (error.message === "Missing data") return res.status(400).json(responseObj(error.message))
        return res.status(500).json(responseObj(error.message))
    }
}

module.exports = {
    updateActivityHandler
}
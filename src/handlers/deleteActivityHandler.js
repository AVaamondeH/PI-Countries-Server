const { deleteActivityAssociation, deleteActivityById } = require("../controllers/deleteActivity");
const { responseObj } = require("./response");


const deleteActivityHandler = async (req, res) => {
    try {
        const { activityId, countryId } = req.query
        if (!activityId && !countryId) throw Error("Missing data")
        console.log(activityId, countryId);
        if (activityId && !countryId) {
            const response = await deleteActivityById(activityId)
            console.log(response);
            if (!response) throw Error("An error occurred while deleting the activity")
            return res.status(200).json(responseObj("Activity deleted successfully", response))
        }

        if (activityId && countryId) {
            const response = await deleteActivityAssociation(activityId, countryId)
            if (!response) throw Error("An error occurred while deleting the Association")
            return res.status(200).json(responseObj("Association deleted successfully", response))
        }

    } catch (error) {
        if (error.message === "Missing data") return res.status(400).json(responseObj(error.message))
        return res.status(500).json(responseObj(error.message))
    }
}

module.exports = {
    deleteActivityHandler
}

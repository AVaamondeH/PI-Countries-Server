const { Country_activities } = require("../db")

const getAssociations = async () => {
    const associations = await Country_activities.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return associations
}

module.exports = {
    getAssociations
};
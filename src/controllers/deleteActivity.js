const { Activity, Country_activities } = require("../db");

const deleteActivityAssociation = async (activityId, countryId) => {
    if (activityId && countryId) {
        const association = await Country_activities.findOne({
            where: {
                ActivityId: activityId,
                CountryId: countryId,
            },
        });

        if (!association) {
            return false;
        }

        await association.destroy();
        return true;
    }

    return false;
};

const deleteActivityById = async (activityId) => {
    const deleteActivity = await Activity.destroy({
        where: {
            id: activityId,
        },
    });

    return deleteActivity;
};

module.exports = {
    deleteActivityAssociation,
    deleteActivityById,
};

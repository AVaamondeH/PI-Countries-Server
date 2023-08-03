const { Activity, Country_activities } = require("../db");


const updateActivityById = async (id, name, difficulty, duration, season, countries) => {

    const updateActivity = await Activity.upsert({
        id: id,
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season
    });

    if (!updateActivity) return "Activity not found"

    const associatedCountries = await Country_activities.findAll({
        where: {
            ActivityId: id,
        },
    });

    const currentCountryIds = associatedCountries.map((association) => association.CountryId);
    const countriesToRemove = currentCountryIds.filter((countryId) => !countries.includes(countryId));
    const countriesToAdd = countries.filter((countryId) => !currentCountryIds.includes(countryId));

    if (countriesToRemove.length) {
        await Country_activities.destroy({
            where: {
                ActivityId: id,
                CountryId: countriesToRemove,
            },
        });
    }

    if (countriesToAdd.length) {
        const newAssociations = countriesToAdd.map((countryId) => ({
            ActivityId: id,
            CountryId: countryId,
        }));
        await Country_activities.bulkCreate(newAssociations);
    }

    return updateActivity;
};

module.exports = {
    updateActivityById,
};
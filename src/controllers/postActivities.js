const { Activity, Country } = require("../db")

const postActivities = async (name, difficulty, duration, season, countries) => {
    
        
        const newActivity = await Activity.create({
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season
        })
      // Se buscan los países por sus ids
        const Associate = await Country.findAll({
            //Where acepta un array de ids y los busca para luego devolverlos
            where: { 
                id: countries 
            },
        });
        await newActivity.setCountries(Associate)
        return newActivity

}

module.exports = {
    postActivities
}

/** 5 tipos de actividades, Deportivas, recreativa, cultiral, educativa y ecologica */
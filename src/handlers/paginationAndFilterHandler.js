const { getFilter } = require("../controllers/getFilter")
const { getOrder} = require("../controllers/getOrder")
const { getCountries } = require("../controllers/getCountries")
const { pagination } = require("../controllers/pagination")


const paginationAndFilterHandler = async (req, res) => {
    try {
        const { page, continent, order,  activity } = req.query
        
        if(!continent && !order && !activity) {
            const response = await getCountries()
            return res.status(200).json(response)
        }

        if (continent && order && !activity) {
            const filter = await getFilter(continent)
            if (!filter.length) throw Error("Not Found")
            const sort = await getOrder(order, filter)
            const response = await pagination(page, sort)
            return res.status(200).json(response)
        }

        if (continent && order && activity) {
            const filter = await getFilter(continent, activity)
            if (!filter.length) return res.status(200).json({})
            const sort = await getOrder(order, filter)
            const response = await pagination(page, sort)
            return res.status(200).json(response)
        }

    
    } catch (error) {
        switch (error.message) {
            case "Not found":
                return res.status(404).send({error: error.message});

            case "Faltan Datos":
                return res.status(400).send({error: error.message})

            default:
                return res.status(500).send({error: error.message})
        }
    }
}

module.exports ={ 
    paginationAndFilterHandler
};

/*En este handler se verifica si estan las querys necesarias para realizar los fitrados y ordenamientos
necesarios y devolverlos al front

se verifica si se mandan varios filtrados y se ejecutan los controladores correspondientes*/



        // if(continent && !order && !activity){
        //     const filter = await getFilter(continent)
        //     if (!filter.length) throw Error("Not Found")
        //     const response = await pagination(page, filter)
        //     return res.status(200).json(response)
        // }
        // if(!continent && order && !activity){
        //     const sort = await getOrder(order)
        //     const response = await pagination(page, sort)
        //     if (!response.length) throw Error("Not Found")
        //     return res.status(200).json(response)    
        // }
        // if (!continent && !order && activity) {
        //     const filter = await getFilter(null, activity)
        //     if (!filter.length) throw Error("Not Found")
        //     const response = await pagination(page, filter)
        //     return res.status(200).json(response)
        // }
        // if (continent && !order && activity) {
        //     const filter = await getFilter(continent, activity)
        //     if (!filter.length) throw Error("Not Found")
        //     const response = await pagination(page, filter)
        //     return res.status(200).json(response)
        // }
        // if (!continent && order && activity) {
        //     const filter = await getFilter(null, activity)
        //     if (!filter.length) throw Error("Not Found")
        //     const sort = await getOrder(order, filter)
        //     const response = await pagination(page, sort)
        //     return res.status(200).json(response)
        // }
        
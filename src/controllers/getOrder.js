const { Country } = require("../db")

const getOrder = async (order, data) => {

    // if(order === "dsc" && !data){ // verificamos si el valor de la query es asc o dsc para proceder a hacer el ordenamiento
    //     //Use sort para devolver los paises ordenados alfabeticamente
    //     const countries = await Country.findAll()
            
    //         countries.sort((country1, country2) => {
    //             //El metodo localeCompare compara cadenas de texto
    //             return country2.name.localeCompare(country1.name);
    //         })
    //         return countries
    //     }
    // if(order === "asc" && !data){ // verificamos si el valor de la query es asc o dsc para proceder a hacer el ordenamiento
    //         //Use sort para devolver los paises ordenados alfabeticamente
    //     const countries = await Country.findAll()
                
    //         countries.sort((country1, country2) => {
    //             return country1.name.localeCompare(country2.name);
    //         })    
    //         return countries
    //         } 

    if(data) {
        if(order === "Hpopu"){ 
                
            data.sort((country1, country2) => {
                return country2.population - country1.population;
            })
            return data
            }
        if(order === "Lpopu"){

            data.sort((country1, country2) => {
                return country1.population - country2.population;
            })    
            return data
            }
    }

    if(data) {
        if(order === "dsc"){ 
                
            data.sort((country1, country2) => {
                return country2.name.localeCompare(country1.name);
            })
            return data
            }
        if(order === "asc"){

            data.sort((country1, country2) => {
                return country1.name.localeCompare(country2.name);
            })    
            return data
            }
    }


}

module.exports ={ 
    getOrder,
};
/* Este controller se encarga de verificar si solo se le pasa un ordenamiento o si tambien se le pasa una data
para devolver ordenado ya sea todos los paises o la data pasada por parametro */
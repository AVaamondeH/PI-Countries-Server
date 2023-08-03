
const pagination = async (pageData, data) => {

    const itemsPerPage = 10;
    const totalData = data.length;
    const numberPages = Math.ceil(totalData / itemsPerPage);
    let page = pageData ? Number(pageData) : 1;

    if (page > numberPages) page = numberPages;
    if (page < 1) page = 1;

    const startingIndex = (page - 1) * itemsPerPage;
    const endingIndex = startingIndex + itemsPerPage;
    const countriesData = data.slice(startingIndex, endingIndex);

    const PageEnumeration = (numberPages) => {
        const pageNumbers = []; // Array vacio que tendra los numeros de pagina a mostrar
        const maxPageToShow = 5; //maximo de numero de paginas a mostrar
        let startPage = Math.max(1,  page - Math.floor(maxPageToShow / 2)); 
        for (let i = 0; i < maxPageToShow && startPage <= numberPages; i++) {
            pageNumbers.push(startPage);
            startPage++;
        }
        return pageNumbers   
    }

    const enumeration = PageEnumeration(numberPages);

    return {
        countriesData,
        totalData,
        enumeration
    };
};


module.exports ={ 
    pagination,
};

// Numero de elementos por pagina
// Total de datos en el array de los paises
// Calculo el número total de páginas necesarias para mostrar todos los datos
// Parseo pageData en un numero 
// Verifico si pageData es (undefined, null, 0, '', etc.), en dado caso le asigno 1
// Si el número de página es mayor al número total de páginas,
// ajustamos el número de página para que sea igual al número total de páginas
// Si el número de página es menor a 1, ajustamos el número de página para que sea 1
// Calculamos el índice de inicio para la porción de datos de la página actual
// Calculamos el índice de fin para la porción de datos de la página actual
// Utilizamos el método 'slice()' para obtener la porción de datos correspondiente a la página actual
// Retornamos la porción de datos correspondiente a la página actual

/* La funcion PageEnumeration nos permite calcular ela cantidad de paginas que se renderizaran
en el front 

*/
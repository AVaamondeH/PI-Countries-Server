const { Router } = require("express");
const router = Router();
const { getCountriesByIdHandler } = require("../handlers/getCountriesByIdHandler")
const { postActivitiesHandler } = require("../handlers/postActivitiesHandler")
const { paginationAndFilterHandler } = require("../handlers/paginationAndFilterHandler")
const { getCountriesByNameHandler } = require("../handlers/getCountriesByNameHandler");
const { deleteActivityHandler } = require("../handlers/deleteActivityHandler");
const { updateActivityHandler } = require("../handlers/updateActivityHandler");
const { getActivitiesHandler } = require("../handlers/getActivitiesHandler");
const { getAssociationsHandler } = require("../handlers/getAssociationsHandler");


router.get("/countries", paginationAndFilterHandler)
router.get("/countries/search", getCountriesByNameHandler)
router.get("/countries/:idPais", getCountriesByIdHandler)
router.get("/activities", getActivitiesHandler)
router.post("/activities", postActivitiesHandler)
router.delete("/activities", deleteActivityHandler)
router.put("/activities", updateActivityHandler)
router.get("/associations", getAssociationsHandler)



module.exports = {
    router
};

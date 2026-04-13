const dml = require("../data/dataManagementLayer");
const {DOG_SIZES, DOG_SIZE_LABELS} = require("../constants/dogSizes");

module.exports.getForm = (req, res, next) => {
    res.render("search/form");
};

module.exports.doSearch = async (req, res, next) => {
    try {
        const desiredDogSize = req.body.dogSize;

        // Validate dog size using constants
        const validSizes = Object.values(DOG_SIZES);
        if (!validSizes.includes(desiredDogSize)) {
            throw new Error(`Invalid dog size. Must be one of: ${validSizes.join(', ')}`);
        }

        const allProfiles = await dml.readProfiles();
        const results = allProfiles.filter((item) => item.dogSize === desiredDogSize);

        console.log(`Searching for ${DOG_SIZE_LABELS[desiredDogSize]} dogs - found ${results.length} results`);

        res.render("search/results", {results: results});
    } catch (error) {
        console.error("Error searching profiles:", error.message);
        next(error);
    }
};


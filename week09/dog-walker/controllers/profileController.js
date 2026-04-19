const dml = require("../data/dataManagementLayer");
const { DOG_SIZES, DOG_SIZE_LABELS } = require("../constants/dogSizes");

module.exports.getForm = (req, res) => {
    res.render("profile/form");
};

module.exports.saveProfile = async (req, res, next) => {
    try {
        const dogName = req.body.dogName;
        const dogSize = req.body.dogSize;
        const image = req.file;

        // Validate dog size using constants
        const validSizes = Object.values(DOG_SIZES);
        if (!validSizes.includes(dogSize)) {
            throw new Error(`Invalid dog size. Must be one of: ${validSizes.join(', ')}`);
        }

        console.log("dogName=" + dogName);
        console.log("dogSize=" + dogSize + " (" + DOG_SIZE_LABELS[dogSize] + ")");
        console.log("image=" + image.path);

        const existedProfiles = await dml.readProfiles();
        const newProfile = {
            dogName: dogName,
            dogSize: dogSize,
            dogUrl: image.path
        };

        await dml.saveProfiles([newProfile, ...existedProfiles]);

        res.render("search/form");
    } catch (error) {
        console.error("Error saving profile:", error.message);
        next(error);
    }
};
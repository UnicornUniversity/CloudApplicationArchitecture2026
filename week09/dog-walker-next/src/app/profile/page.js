import ProfileForm from "../../components/ProfileForm";
const dml = require("../data/dataManagementLayer");
import {redirect} from "next/navigation";

export default function Profile(){

    async function saveInDatabase(formData) {
        "use server"

        // server validation is must
        const dogName = formData.get("dogName");
        const dogSize = formData.get("dogSize");
        const dogImage = formData.get("dogImage");

        // TODO good to have: try/catch, logging

        if (!dogName || dogName.trim().length < 2) {
            throw new Error("Dog name is not set correctly");
        }

        if (dogImage.size === 0) {
            throw new Error("Dog Image is not set correctly");
        }

        const newUser = {
            "dogName": dogName,
            "dogSize": parseInt(dogSize),
            "dogUrl": dogImage.name
        };

        const allUsers = await dml.readUsers();
        await dml.saveUsers([newUser, ...allUsers]);
        await dml.saveImage(dogImage);

        redirect("/search");
    }

    return(<ProfileForm saveInDatabase={saveInDatabase} />);
}
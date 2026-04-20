"use client"

import ImageUploader from "./ImageUploader";
import {useState} from "react";

export default function ProfileForm({saveInDatabase}) {

    const [isSaving, setIsSaving] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    function validateForm(formData) {
        const errors = [];

        if (formData.get("dogName").trim().length === 0) {
            errors.push("Dog Name is mandatory field");
        }

        if (formData.get("dogImage").size === 0) {
            errors.push("Dog Image is mandatory field");
        }

        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault();

        setIsSaving(true);
        setFormErrors([]);

        const formData = new FormData(e.target);
        //console.log(data.get("dogName"));
        // validation
        const errors = validateForm(formData);
        setFormErrors(errors);
        if (errors.length > 0) {
            setIsSaving(false);
            return;
        }

        saveInDatabase(formData);
    }

    return (
        <form onSubmit={handleSubmit}>

            <h4>Add New User</h4>
            <div className="form-group">
                <label htmlFor="dogName" className="form-label">Dog Name</label>
                <input type="text"
                       name="dogName"
                       className="form-control"
                       placeholder="input dog name"/>
            </div>

            <div className="form-group">
                <label htmlFor="dogSize" className="form-label">Dog Size</label>
                <select name="dogSize" className="form-control">
                    <option value="0">less then 5 kg</option>
                    <option value="1">6-14 kg</option>
                    <option value="2">more than 14 kg</option>
                </select>
            </div>

            <div className="form-group">
                <ImageUploader title="Portrait" name="dogImage" formErrors={formErrors}/>
            </div>

            {isSaving ? (<div className="alert alert-primary">
                <strong>Please wait...</strong>
            </div>) : (<button className="btn btn-primary">Save</button>)
            }

            {formErrors.length > 0 && <div className="alert alert-dismissible alert-danger">
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                <strong>{formErrors.join(";")}</strong>
            </div>}

        </form>

    );
}
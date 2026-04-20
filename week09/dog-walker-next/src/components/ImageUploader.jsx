"use client"

import Image from "next/image";
import {useState} from "react";

export default function ImageUploader({title, name, formErrors}) {

    const [uploadedImage, setUploadedImage] = useState(null);

    function handleImageUploaded(e) {
        const image = e.target.files[0];
        // TODO validation: size >>  setUploadedImage(null);

        const fr = new FileReader();

        fr.onerror = () => {
            formErrors.push("Can't read image");
        }

        fr.onload = () => {
            setUploadedImage(fr.result);
        }

        fr.readAsDataURL(image);
    }

    return (
        <>
            <label htmlFor="dogName" className="form-label">{title}</label>
            <input type="file"
                   name={name}
                   className="form-control"
                   accept="image/jpg"
                   onChange={handleImageUploaded}
            />
            {uploadedImage != null && <Image
                src={uploadedImage}
                alt="dog portrait"
                width="250"
                height="250"/>}
        </>);
}
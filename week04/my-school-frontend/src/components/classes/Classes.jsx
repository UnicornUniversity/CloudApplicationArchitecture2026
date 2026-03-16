import {DAO} from "../../data/DAO";
import ClassCard from "./ClassCard";
import {useEffect, useState} from "react";

export default function Classes() {

    // receive data from Backend
    const dao = new DAO();

    const [classesData, setClassesData] = useState([]);

    // [] -- runs once when component rendered
    useEffect(() => {
        dao.readClasses().then((items) => setClassesData(items));
    }, []);

    return (
        <div className="card-group">
            {
                classesData.map((cls) => <ClassCard id={cls.id} name={cls.name} />)
            }
        </div>
    );
}
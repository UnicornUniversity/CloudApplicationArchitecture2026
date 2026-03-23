import {useEffect, useState} from "react";
import {DAO} from "../../data/DAO";
import {useParams} from "react-router-dom"
import StudentsFilter from "../shared/StudentsFilter";
import AddGrade from "./AddGrade";

export default function Students() {

    const params = useParams();
    const idClassDefault = 1;

    // receive data from Backend
    const dao = new DAO();

    const [classesData, setClassesData] = useState([]);
    const [subjectsData, setSubjectsData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [idClass, setIdClass] = useState(params.idClass === undefined ? idClassDefault : parseInt(params.idClass));
    const [idSubject, setIdSubject] = useState(1);
    const [isGradeWindowVisible, setGradeWindowVisible] = useState(false);

    useEffect(() => {
        dao.readClasses().then((items) => setClassesData(items));
        dao.readSubjects().then((items) => setSubjectsData(items));
    }, []);

    useEffect(() => {
        dao.readStudents(idClass).then((items) => setStudentsData(items));
    }, [idClass]);

    function openGradeWindow(){
        setGradeWindowVisible(true);
    }

    return (
        <>
            <div className="row">
                <StudentsFilter
                    classesList={classesData}
                    classesHandler={setIdClass}
                    currentIdClass={idClass}
                    subjectList={subjectsData}
                    subjectHandler={setIdSubject}
                />
            </div>

            <div className="row">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date of Birth</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        studentsData.map((st) =>
                            <tr>
                                <th scope="row">{st.id}</th>
                                <td>{st.name}</td>
                                <td>{st.dobStr}</td>
                                <td>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={openGradeWindow}>Add Grade</button>
                                    <AddGrade idStudent={st.id} idSubject={idSubject} isVisible={isGradeWindowVisible} visibilityHandler={setGradeWindowVisible} />
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

            <AddGrade />
        </>
    );
}
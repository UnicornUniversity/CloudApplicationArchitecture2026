import {DAO} from "../../data/DAO";
import {useEffect, useState} from "react";
import ClassCard from "../classes/ClassCard";
import StudentsFilter from "../shared/StudentsFilter";
import AddGrade from "../students/AddGrade";
import PerformanceGrid from "./PerformanceGrid";

export default function Reports() {

    // receive data from Backend
    const dao = new DAO();

    const [classesData, setClassesData] = useState([]);
    const [subjectsData, setSubjectsData] = useState([]);
    const [idClass, setIdClass] = useState(0);
    const [idSubject, setIdSubject] = useState(1);

    //data
    const [dataGrid, setDataGrid] = useState([]);
    const [dataGridFilter, setDataGridFilter] = useState([]);

    useEffect(() => {
        dao.readClasses().then((items) => setClassesData(items));
        dao.readSubjects().then((items) => setSubjectsData(items));
        dao.readPerformance().then((items) =>{
            setDataGrid(items);
            refreshDataGrid();
        });
    }, []);

    function refreshDataGrid() {
        // 0 means ALL CLASSES
        setDataGridFilter(idClass === 0 ? dataGrid : dataGrid.filter((item) => parseInt(item.idClass) === idClass));
    }

    useEffect(() => {
        refreshDataGrid();
    }, [idClass]);

    return (
        <>
            <div className="row">
                <StudentsFilter
                    classesList={classesData}
                    classesHandler={setIdClass}
                    currentIdClass={idClass}
                    subjectList={subjectsData}
                    subjectHandler={setIdSubject}
                    isSubjectVisible={false}
                />
            </div>

            <div className="row">
                <PerformanceGrid dataGrid={dataGridFilter} subjectList={subjectsData}/>
            </div>

            <AddGrade/>
        </>
    );
}
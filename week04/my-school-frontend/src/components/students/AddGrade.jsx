import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from "react";
import {DAO} from "../../data/DAO";

export default function AddGrade({idStudent, idSubject, isVisible, visibilityHandler}) {
    const [show, setShow] = useState(true);
    const [gradeValue, setGradeValue] = useState(1);

    function handleClose() {
        visibilityHandler(false);
    }

    function saveGrade() {
        const idStudentInt = parseInt(idStudent);
        console.log("idSubject=" + idSubject);
        const idSubjectInt = parseInt(idSubject);
        const dtDate = new Date();
        const dateStr = dtDate.getFullYear() + "-" + (dtDate.getMonth() + 1) + "-" + dtDate.getDate();
        const data = {
            idStudent: idStudentInt,
            idSubject: idSubjectInt,
            date: dateStr,
            mark: gradeValue
        };
        console.log(data);

        const dao = new DAO();
        dao.saveGrade(data).then((res) => handleClose(), (reject) => console.log(reject.message))

    }

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);

    function gradeChangeHandler(e){
        setGradeValue(e.target.value);
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Grade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <select className="form-control form-control-sm" onChange={gradeChangeHandler}>
                        <option selected={true}>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={saveGrade}>
                    Save
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
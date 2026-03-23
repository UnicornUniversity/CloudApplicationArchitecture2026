import {DAO} from "../../data/DAO";
import {useEffect, useState} from "react";
import ClassCard from "../classes/ClassCard";
import AddGrade from "../students/AddGrade";

export default function PerformanceGrid({dataGrid, subjectList}) {


    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Class</th>
                    {
                        subjectList.map((subject) => <th scope="col">{subject.name}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    dataGrid.map((st) =>
                        <tr>
                            <th scope="row">{st.idStudent}</th>
                            <td>{st.nameStudent}</td>
                            <td>{st.nameClass}</td>
                            {
                                st.subjectStats.map((subInfo) =>
                                    <td>{subInfo.value}</td>
                                )
                            }
                        </tr>
                    )
                }
                </tbody>
            </table>
        </>
    );
}
export default function StudentsFilter({classesList,
                                           classesHandler,
                                           currentIdClass,
                                           subjectList,
                                           subjectHandler,
                                           isSubjectVisible = true
                                        }) {

    function classChanged(event) {
        classesHandler(parseInt(event.target.value));
    }

    function subjectChanged(event) {
        subjectHandler(parseInt(event.target.value));
    }

    const allTitle = "<ALL>";
    const classesAll = [{id: 0, name: allTitle}, ...classesList];

    return (
        <>
            <div className="col-sm">
                <label htmlFor="classSelector">Class:</label>
                <select className="form-select" name="classSelector" onChange={classChanged}>
                    {
                        classesAll.map((cl) =>
                            <option value={cl.id}
                                    selected={parseInt(cl.id) === parseInt(currentIdClass)}>
                                {cl.name}
                            </option>
                        )
                    }
                </select>
            </div>
            {isSubjectVisible &&
                <div className="col-sm">
                    <label htmlFor="subjectSelector">Subject:</label>
                    <select className="form-select" name="subjectSelector" onChange={subjectChanged}>
                        {
                            subjectList.map((sb) =>
                                <option value={sb.id}>{sb.name}</option>
                            )
                        }
                    </select>
                </div>
            }
        </>
    );
}
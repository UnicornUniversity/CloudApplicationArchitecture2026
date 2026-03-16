export default function StudentsFilter({classesList, classesHandler, currentIdClass}) {

    function classChanged(event) {
        classesHandler(parseInt(event.target.value));
    }

    return (
        <>
            <label htmlFor="classSelector">Class:</label>
            <select className="form-select" name="classSelector" onChange={classChanged}>
                {
                    classesList.map((cl) =>
                        <option value={cl.id}
                                selected={parseInt(cl.id) === parseInt(currentIdClass)}>
                            {cl.name}
                        </option>
                    )
                }
            </select>
        </>

    );
}
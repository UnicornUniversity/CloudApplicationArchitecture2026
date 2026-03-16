import {Link} from "react-router-dom"

export default function ClassCard({id, name}){
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">TODO class info</p>
                <p className="card-text">
                    <Link to={"/students/" + parseInt(id)}>Show Students</Link>
                </p>
            </div>
        </div>
    );
}
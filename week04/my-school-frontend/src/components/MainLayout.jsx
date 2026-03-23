import {Link, Outlet} from "react-router-dom"

export default function MainLayout() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/classes/"} className="nav-link">Classes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/students"} className="nav-link">Students</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/reports"} className="nav-link">Reports</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Outlet/>
            </div>

        </>
    )
}
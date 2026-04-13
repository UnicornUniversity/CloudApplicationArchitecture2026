import Link from "next/link";

export default function NavBar() {
    return (<nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/search" className="nav-link">Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/search" className="nav-link">Profile</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>);
}
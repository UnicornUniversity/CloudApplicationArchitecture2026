import {useState} from "react";
import {Alert} from "react-bootstrap";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const baseUrl = "http://localhost:3001";
    const localStorageKey = "token-auth-app";

    function loginHandler(e) {
        setLogin(e.target.value);
    }

    function submitRoutines() {
        if (login.length === 0) {
            setError("Login is a mandatory field");
            return;
        }
        setError("");
        fetch(baseUrl + "/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({login: login})
        }).then(res => {
            console.log("code: " + res.status);
            if (!res.ok){
                setError(res.statusText)
            } else{
                res.json().then((parsedJson) => {
                    setMessage("You are " + parsedJson.userName + "! Your token: " + parsedJson.token);
                    localStorage.setItem(localStorageKey, parsedJson.token);
                });
            }
        });
    }

    function sayHello(){
        const token = localStorage.getItem(localStorageKey);
        fetch(baseUrl + "/hello", {
            //Bearer is a special word required by convention
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            console.log("code: " + res.status);
            if (!res.ok){
                setError(res.statusText);
            } else{
                res.json().then((parsedJson) => {
                    setMessage(`Message: ${parsedJson.message}; login: ${parsedJson.userInfo.login}; read: ${parsedJson.userInfo.read}; write: ${parsedJson.userInfo.write}`);
                });
            }
        });
    }

    function logoff(){
        localStorage.removeItem(localStorageKey);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                </div>
                <div className="col-sm">
                    <div className="form-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" className="form-control" id="login" name="login" required
                               onChange={loginHandler}/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary btn-sm rowMargin"
                                onClick={submitRoutines}>Authentication
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary btn-sm rowMargin"
                                onClick={sayHello}>Say Hello
                        </button>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary btn-sm rowMargin"
                                onClick={logoff}>Log off
                        </button>
                    </div>
                    {error.length > 0 &&
                        <Alert className="alert alert-danger rowMargin">{error}</Alert>
                    }
                    {message.length > 0 &&
                        <Alert className="alert alert-success rowMargin">
                            {message}
                        </Alert>
                    }
                </div>
                <div className="col-sm">
                </div>
            </div>
        </div>
    );
}
import React from "react";
import CONSTANTS from "../../constants";
//import styles from "./styles.module.css";


const Login = () => {
    // Must add login support

    //Register Vars
    const [user, setUser] = React.useState("")
    const [userError, setUserError] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [pass2, setPass2] = React.useState("")
    const [passError, setPassError] = React.useState("")

    //Login Vars
    const [userL, setUserL] = React.useState("")
    const [userErrorL, setUserErrorL] = React.useState("")
    const [passL, setPassL] = React.useState("")
    const [passErrorL, setPassErrorL] = React.useState("")


    function validateUser(val) {
        if (val.length < 5 || val.length > 16) {
            return (false)
        } 
        return (true)
    }

    function validatePass(val){
        if (val.length < 5 || val.length > 16) {
            return (false)
        } 
        return (true)
    }

    function validateEqualPass(val1, val2){
        if (val1 == val2){
            return (true)
        }
        return (false)
    }

    //REGISTER
    const handleUserChange = (val) => {
        if (validateUser(val.target.value)) {
            setUserError("");
        } else {
            setUserError("Username must be > 5 and < 16 characters");
        }
        setUser(val.target.value)
    }

    const handlePassChange = (val) => {
        if (validatePass(val.target.value)) {
            setPassError("")
        } else {
            setPassError("Passwords must be > 5 and < 16 characters")
        }
        console.log("Handeling Pass Change")
        setPass(val.target.value)
        if(!validateEqualPass(pass, pass2)){
            setPassError("Passwords Must Match")
        }
    }

    const handlePass2Change = (val) => {
        if (validatePass(val.target.value)) {
            setPassError("")
        } else {
            setPassError("Passwords must be > 5 and < 16 characters")
        }
        console.log("Handeling Pass Change")
        setPass2(val.target.value)
        if(!validateEqualPass(pass, pass2)){
            setPassError("Passwords Must Match")
        }

    }

    const handleRegister = (evt) => {
        //evt.preventDefault()
        //Write validation for users
        
        if (validateUser(user) && validatePass(pass) && validateEqualPass(pass, pass2)) {
            //handle 
            
        } else {
            evt.preventDefault()
            setPass("")
            setPass2("")
            //return 
        }
        //const req = CONSTANTS.ENDPOINT.REGISTER + String(user) + "/" + String(pass);
        const req = "/api/add_user/" + String(user) + "/" + String(pass);
        console.log(req)
        fetch(req, {method: "POST"}).then( Response => {
            return Response.json;
        })
        .then(users => {
            console.log(users);
        })
        
        //Write validation for users
        //update database
    }

    //LOGIN

    const handleUserChangeL = (val) => {
        if (validateUser(val.target.value)) {
            setUserErrorL("");
        } else {
            setUserErrorL("Username must be > 5 and < 16 characters");
        }
        setUserL(val.target.value)
    }

    const handlePassChangeL = (val) => {
        if (validatePass(val.target.value)) {
            setPassErrorL("")
        } else {
            setPassErrorL("Password must be > 5 and < 16 characters")
        }
        console.log("Handeling Pass Change")
        setPassL(val.target.value)
    }


    const handleLogin = (evt) => {
        
        //Write validation for users
        if (validateUser(userL) && validatePass(passL)) {
            //handle 
            //const req = CONSTANTS.ENDPOINT.LOGIN + String(userL) + "/" + String(passL);
            const req = "/api/login/" + String(userL) + "/" + String(passL);
            console.log(req)
            fetch(req, {method: "POST"}).then( Response => {
                return Response.json;
            })
            .then(users => {
                console.log(users);
            })
        } else {
            setPassL("")
            evt.preventDefault();
            return
        }
        //check database for login
        return
    }

    return <main id="Login">
        <div className="container">
        <div className="col justify-content-center mt-5 p-0">
                <h2>
                    Login
                </h2>
                <form onSubmit= { handleLogin }>
                    <p> User: </p>
                    <input type="text" name="user" onChange={ handleUserChangeL } />
                    
                    {userErrorL.length > 0 && <span id="error">&nbsp;{userErrorL}</span>}
                    <p> Password: </p>
                    <input type="text" name="Password" onChange={ handlePassChangeL } />
                    {passErrorL.length > 0 && <span id="error">&nbsp;{passErrorL}</span>}
                    <br/>
                    <p/>
                    <input type= "submit" value="Login"/>
                </form>
            </div>
            <br/>
            <h3> Or... </h3>
            <div className="col justify-content-center mt-5 p-0">
                <h2>
                    Register
                </h2>
                <form onSubmit= { handleRegister }>
                    <p> User: </p>
                    <input type="text" name="user" onChange={ handleUserChange } />
                    
                    {userError.length > 0 && <span id="error">&nbsp;{userError}</span>}
                    <p> Password: </p>
                    <input type="text" name="Password" onChange={ handlePassChange } />
                    {passError.length > 0 && <span id="error">&nbsp;{passError}</span>}
                    <br/>
                    <p> Confirm Password:</p>
                    <input type="text" name="ConfirmPassword" onChange={ handlePass2Change } />
                    {passError.length > 0 && <span id="error">&nbsp;{passError}</span>}
                    <br/>
                    
                    <p/>
                    <input type= "submit" value="Register"/>
                </form>
                <br/>
            </div>
        </div>
    </main>
}
export default Login;




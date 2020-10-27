import React from "react";

const Login = () => {
    const [email, setEmail] = React.useState("")
    const [emailError, setEmailError] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [passError, setPassError] = React.useState("")
    

    function validateEmail(val) {
        const re =  /\S+@\S+\.\S+/;
        //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(val).toLowerCase());
    }

    function validatePass(val){
        if (val.length < 5 || val.length > 16) {
            return (false)
        } 
        return (true)
    }

    const handleEmailChange = (val) => {
        if (validateEmail(val.target.value)) {
            setEmailError("");
        } else {
            setEmailError("Invalid Email");
        }
        setEmail(val.target.value)
    }

    const handlePassChange = (val) => {
        if (validatePass(val.target.value)) {
            setPassError("")
        } else {
            setPassError("Password must > 5 and < 16 characters")
        }
        setPass(val.target.value)
    }

    const handleLogin = (evt) => {
        evt.preventDefault();
        //Write validation for emails
        if (validateEmail(email)) {
            //handle 
        } else {
            setPass("")
            return
        }
        //check database for login

    }

    const handleRegister = (evt) => {

        evt.preventDefault();
        //Write validation for emails
        if (validateEmail(email)) {
            //handle 
        } else {
            setPass("")
            return
        }
        
        //Write validation for emails
        validateEmail(email)
        //update database


    }

    return <main id="Login">
        <div className="container">
            <div className="col justify-content-center mt-5 p-0">
                <h4>
                    Login
                </h4>
                <form>
                    <p> Email: </p>
                    <input type="text" name="email" onChange={ handleEmailChange } />
                    
                    {emailError.length > 0 && <span id="error">&nbsp;{emailError}</span>}
                    <p> Password: </p>
                    <input type="text" name="Password" onChange={ handlePassChange } />
                    {passError.length > 0 && <span id="error">&nbsp;{passError}</span>}
                    <br/>
                    <br/>
                    <input type= "submit" value="Login" onSubmit={handleLogin}/>
                    <p/>
                    <input type= "submit" value="Register" onSubmit={handleRegister}/>
                </form>
            </div>
        </div>
    </main>
}
export default Login;




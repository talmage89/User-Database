import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

export default function Login() {
    const [info, setInfo] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'age': 0
    });
    const [emailError, setEmailError] = useState({
        'activated': false,
        'message': "Please enter a valid email"
    });
    const [unknownEmail, setUnknownEmail] = useState(false);
    const navigate = useNavigate();

    // didn't really want to find a way to combine all these into one complex validation function
    function validateFirstName(e) {
        const value = e.target.value;
        let validator = new RegExp("[^a-z\\s]", "gi");
        if (value.length > 20) return;
        if (validator.test(value)) return;
        setInfo((prevState) => ({
            ...prevState,
            'firstName': value
        }));
    }
    function validateLastName(e) {
        const value = e.target.value;
        let validator = new RegExp("[^a-z\\s]", "gi");
        if (value.length > 20) return;
        if (validator.test(value)) return;
        setInfo((prevState) => ({
            ...prevState,
            'lastName': value
        }));
    }
    function validateEmail(e) {
        setEmailError({...emailError, "activated": false});
        const value = e.target.value;
        let validator = new RegExp("\\s", "gi");
        if (validator.test(value)) return;
        setInfo((prevState) => ({
            ...prevState,
            'email': value
        }));
    }
    function validateAge(e) {
        const value = e.target.value;
        let validator = new RegExp("[^0-9]", "gi");
        if (value.length > 3) return;
        if (validator.test(value)) return;
        setInfo((prevState) => ({
            ...prevState,
            'age': value
        }));
    }

    function handleSubmit() {
        let emailVerification = new RegExp('^[^\\s]+@\\w+.\\w+$', 'gi');
        if (emailVerification.test(info.email)) {
            fetch('http://localhost:3000', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            .then((response) => {
                if (response.status === 202){
                    setUnknownEmail(true);
                } else navigate('/home');
            })
        } else setEmailError({
            "activated": true, 
            "message": "Please enter a valid email"
        });
    }

    return (
        <>
            <div className="content-logo"><i className="fa-solid fa-user" /></div>
            <div className="content-info">
                <h4 className="content-header">User Management Database</h4>
                <p className="content-text">{unknownEmail ? "Your email is unknown, please make an account" : "Enter your email"}</p>
            </div>
            <form
                className="content-form"
                action='/'
                onSubmit={(e) => {
                    e.preventDefault();
                }}>
                <span>
                    {unknownEmail && <div className="form-element">
                        <label htmlFor="firstname">First name</label>
                        <input
                            className="input-field"
                            type="text"
                            name="firstname"
                            value={info.firstName}
                            onChange={validateFirstName} />
                    </div>}
                    {unknownEmail && <div className="form-element">
                        <label htmlFor="lastname">Last name</label>
                        <input
                            className="input-field"
                            type="text" name="lastname"
                            value={info.lastName}
                            onChange={validateLastName} />
                    </div>}
                </span>
                <span>
                    <div className={unknownEmail ? "form-element form-element-email" : "form-element form-element-email-solo"}>
                        <label htmlFor="email">Email</label>
                        <input
                            className={emailError.activated ? "input-field email-error" : "input-field"}
                            type="text"
                            name="email"
                            value={info.email}
                            onChange={validateEmail} />
                        <p className={emailError.activated ? "email-error-message activated" : "email-error-message"}>
                            {emailError.message}
                        </p>
                    </div>
                    {unknownEmail && <div className="form-element" style={{ width: 75 }}>
                        <label htmlFor="age">Age</label>
                        <input
                            className="input-field"
                            type="number"
                            name="age"
                            value={info.age}
                            onChange={validateAge} />
                    </div>}
                </span>
                <span>
                    <div className="form-element">
                        <input
                            className="submit-button"
                            type="submit"
                            value={unknownEmail ? "create user" : "sign in"}
                            onClick={handleSubmit} />
                    </div>
                </span>
            </form>
        </>
    )
}

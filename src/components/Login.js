import React, { useState, useContext } from 'react'
import { Button, Form } from "react-bootstrap"
import AuthContex from '../context/AuthProvider'

function Login({ setLoggedIn, setUserData, setFormActive }) {
    const { setAuth } = useContext(AuthContex)
    const [loginFormData, setLoginFormData] = useState({
        login_id: "",
        password: ""
    })

    function handleLoginOnChange(e) {
        let name = e.target.name
        let value = e.target.value
        setLoginFormData({
            ...loginFormData,
            [name]: value
        })
    }

    function handleLoginSubmit(e) {
        e.preventDefault()
        const postBody = {
            "login_id": loginFormData.login_id,
            "password": loginFormData.password
        }

        fetch("http://localhost:9292/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody),
        })
            .then(res => res.json())
            .then(authenticate => {
                if (authenticate) {
                    setAuth(authenticate)
                    setUserData(authenticate);
                    setLoggedIn(true);
                }

            })
        setLoginFormData({ login_id: "", password: "" });
    }

    return (
        <div className="color-overlay d-flex justify-content-center align-items-center">
            <Form className="rounded p-3 p-sm-4" onSubmit={(e) => handleLoginSubmit(e)}>
                <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={loginFormData.login_id} onChange={handleLoginOnChange} name="login_id" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={loginFormData.password} onChange={handleLoginOnChange} name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>{' '}
                <Button variant="primary" onClick={() => setFormActive("")}>Cancel</Button>
            </Form>
        </div>
    )
}

export default Login
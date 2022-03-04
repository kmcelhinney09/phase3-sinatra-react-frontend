import React, { useState } from "react"
import Login from "./Login"
import CreateNew from "./CreateNew"
import { Button } from "react-bootstrap"


function Home({ setLoggedIn, setUserData }) {
    const [formActive, setFormActive] = useState("")
    


function determineForm() {
    if (formActive === "login") {
        return <Login setLoggedIn={setLoggedIn} setUserData = {setUserData} setFormActive={setFormActive}/>
    }
    else if (formActive === "create") {
        return <CreateNew setLoggedIn={setLoggedIn} setUserData = {setUserData} setFormActive={setFormActive}/>
    }
    else {
        return splashScreen()
    }
}

function splashScreen() {
    return (
        <div className="splash-screen">
            <div className="Title">
                <h1 className="display-1 text-primary">Welcome to Mama's Recipe Box</h1>
            </div>
            <div className="login-btn">
                <Button varient="primary" onClick={() => setFormActive("login")}> Login </Button>{' '}
                <Button varient="primary" onClick={() => setFormActive("create")}> Create New </Button>
            </div>
        </div>
    )
}
return (
    <div className="login">
        <div className="bg-image">
        </div>
        {determineForm()}
    </div>
)
}

export default Home

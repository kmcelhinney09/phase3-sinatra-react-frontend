import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { UserAuth } from "../context/AuthProvider";

function CreateNew({ setFormActive }) {
  const fetchUrl = process.env.REACT_APP_SERVER;
  const { setUser } = UserAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [createFormData, setCreateFormData] = useState({
    name: "",
    login_id: "",
    password: "",
    confirmpassword: "",
  });

  function handleCreateOnChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setCreateFormData({
      ...createFormData,
      [name]: value,
    });
  }

  function passwordMatch() {
    if (createFormData.password === createFormData.confirmpassword) {
      return true;
    } else {
      return false;
    }
  }

  function passwordMisMatch() {
    setAlertMessage("Passwords do not match");
    setShowAlert(true);
    setCreateFormData({ ...createFormData, password: "", confirmpassword: "" });
  }

  function createNewUser() {
    const postBody = {
      name: createFormData.name,
      login_id: createFormData.login_id,
      password: createFormData.password,
    };
    fetch(`${fetchUrl}/users/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log(userData);
        if (userData.id) {
          sessionStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setCreateFormData({
            name: "",
            login_id: "",
            password: "",
            confirmpassword: "",
          });
        }
      });
  }

  function handleCreateSubmit(e) {
    e.preventDefault();
    passwordMatch() ? createNewUser() : passwordMisMatch();
  }

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-4 p-sm-3"
        onSubmit={(e) => handleCreateSubmit(e)}
      >
        <Alert
          variant="warning"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
        <Form.Group className="mb-3" controlId="createName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first and last name"
            value={createFormData.name}
            onChange={handleCreateOnChange}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={createFormData.login_id}
            onChange={handleCreateOnChange}
            name="login_id"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={createFormData.password}
            onChange={handleCreateOnChange}
            name="password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={createFormData.confirmpassword}
            onChange={handleCreateOnChange}
            name="confirmpassword"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>{" "}
        <Button variant="primary" onClick={() => setFormActive("")}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default CreateNew;

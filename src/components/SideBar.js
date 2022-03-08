import React, { useState, useEffect } from "react";
import { Nav, Form, FormControl, Button } from "react-bootstrap";

function SideBar() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategoryList(data);
      });
  }, []);

  return (
    <>
      <Form className="d-flex" style={{boxShadow:"0px 0px 0px"}}>
        <FormControl
          type="search"
          placeholder="Search Ingredients"
          className="me-6"
        />
        <Button variant="outline-success" >Search</Button>
      </Form>
      <Nav defaultActiveKey="/home" className="flex-column pt-2">
        <Nav.Item>Recipe Categories</Nav.Item>
        {categoryList.map((category) => (
          <Nav.Link
            key={category.id}
            href={`/category/${category.id}`}
            className="text-secondary"
          >
            {category.category_name}
          </Nav.Link>
        ))}
      </Nav>
    </>
  );
}

export default SideBar;

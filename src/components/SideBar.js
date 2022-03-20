import React, { useState, useEffect } from "react";
import { Nav, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

function SideBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:9292/categories`)
      .then((res) => res.json())
      .then((categoriesData) => {
        
        const categoryNameList = []
        categoriesData.forEach(category => categoryNameList.push(category.category_name))
        sessionStorage.setItem("category", JSON.stringify(categoryNameList))
        setCategoryList(categoryNameList);
      });
  }, []);

  function handleOnChange(e) {
    setIngredientName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    history.push(`/ingredient/${ingredientName}`)
  }

  return (
    <>
      <Form
        className="d-flex"
        style={{ boxShadow: "0px 0px 0px" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControl
          value={ingredientName}
          type="search"
          placeholder="Search Ingredients"
          className="me-6"
          onChange={handleOnChange}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
      <Nav defaultActiveKey="/home" className="flex-column pt-2">
        <Nav.Item>Recipe Categories</Nav.Item>
        {categoryList.map((category, index) => (
          <LinkContainer key={index} to={`/category/${index+1}`} >
          <Nav.Link
            className="text-secondary"
          >
            {category}
          </Nav.Link>
          </LinkContainer>
        ))}
      </Nav>
    </>
  );
}

export default SideBar;

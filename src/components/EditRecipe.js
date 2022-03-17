import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

function EditRecipe() {
  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const editRecipeData = {
      recipe_name: location.state.recipeData.recipe_name,
      cal_per_serving: location.state.recipeData.cal_per_serving,
      category_name: location.state.recipeData.category_name,
      creator_id: location.state.recipeData.creator_id,
      ingredients: location.state.recipeData.ingredients.map(
        (ingredientData) => ({
          ingredient_name: ingredientData.ingredient.ingredient_name,
          cal_per_serving: ingredientData.ingredient.cal_per_serving,
          quantity: ingredientData.quantity,
          units: ingredientData.units,
        })
      ),
      directions: location.state.recipeData.directions,
      img_url: location.state.recipeData.img_url,
      serving_size: location.state.recipeData.serving_size,
    };

    setRecipeData(editRecipeData);
  }, [location]);

  const categoryNames = JSON.parse(sessionStorage.getItem("category"));
  const user = JSON.parse(sessionStorage.getItem("user"));
  const units = [
    "cups",
    "tsp",
    "tbsp",
    "oz",
    "lbs",
    "fl oz",
    "millilters",
    "Liters",
    "grams",
    "Kilograms",
    "pints",
    "quarts",
    "gallons",
    "pinch",
    "dash",
  ];

  const [recipeData, setRecipeData] = useState({
    recipe_name: "",
    cal_per_serving: "",
    category_name: "",
    creator_id: user.id,
    ingredients: [
      {
        ingredient_name: "",
        cal_per_serving: "",
        quantity: "",
        units: "Units",
      },
    ],
    directions: "",
    img_url: "",
    serving_size: "",
  });

  function handleNewRecipeChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  }

  function handleCancle() {
    const pushed_address = `/users/${user.id}`;
    history.push(pushed_address);
  }

  function handleIngredientChange(i, e) {
    let newIngredientValues = recipeData.ingredients;
    newIngredientValues[i][e.target.name] = e.target.value;
    setRecipeData({
      ...recipeData,
      ingredients: newIngredientValues,
    });
  }

  function handleIngredientUnts(i, e) {
    let newIngredientValues = recipeData.ingredients;
    newIngredientValues[i]["units"] = e;
    setRecipeData({
      ...recipeData,
      ["ingredients"]: newIngredientValues,
    });
  }

  function handleRecipeCategory(e) {
    setRecipeData({ ...recipeData, ["category_name"]: e });
  }

  function addIngredient() {
    setRecipeData({
      ...recipeData,
      ["ingredients"]: [
        ...recipeData.ingredients,
        {
          ingredient_name: "",
          cal_per_serving: "",
          quantity: "",
          units: "Units",
        },
      ],
    });
  }

  function removeIngredient(i) {
    let newIngredientValues = recipeData.ingredients;
    newIngredientValues.splice(i, 1);
    setRecipeData({
      ...recipeData,
      ["ingredients"]: newIngredientValues,
    });
  }

  function handleNewRecipeSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/recipes/${location.state.recipeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((res) => res.json())
      .then((confirm) => {
        console.log(confirm);
        history.push(`/recipe/${location.state.recipeId}`);
      });
  }

  return (
    <div>
      <Form className="pt-2" onSubmit={(e) => handleNewRecipeSubmit(e)}>
        <Form.Group as={Row} className="ps-2 mb-3" controlId="recipe_name">
          <Col sm={5}>
            <Form.Control
              placeholder="Recipe Name"
              onChange={handleNewRecipeChange}
              value={recipeData.recipe_name}
              name="recipe_name"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="ps-2 mb-3" controlId="recipe_name">
          <Col sm={5}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="New Recipe Category"
                name="category_name"
                onChange={handleNewRecipeChange}
                value={recipeData.category_name}
              />

              <DropdownButton
                variant="outline-secondary"
                title="Select Existing Category"
                align="end"
                onSelect={(e) => handleRecipeCategory(e)}
              >
                {categoryNames.map((name, index) => (
                  <Dropdown.Item key={index + 1} eventKey={name}>
                    {name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="ps-2 mb-3" controlId="serving_size">
          <Col sm={5}>
            <Form.Control
              placeholder="Serving Size (whole number only)"
              onChange={handleNewRecipeChange}
              value={recipeData.serving_size}
              name="serving_size"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="ps-2 mb-3" controlId="cal_per_serving">
          <Col sm={5}>
            <Form.Control
              placeholder="Calories Per Serving (whole number only)"
              onChange={handleNewRecipeChange}
              value={recipeData.cal_per_serving}
              name="cal_per_serving"
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="ps-2 mb-3"
          controlId="recipe_directions"
        >
          <Col sm={5}>
            <Form.Control
              as="textarea"
              placeholder="What are the dirctions for the recipe"
              onChange={handleNewRecipeChange}
              value={recipeData.directions}
              name="directions"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="ps-2 mb-3" controlId="recipe_img">
          <Col sm={5}>
            <Form.Control
              placeholder="Enter Recipe Image URL"
              onChange={handleNewRecipeChange}
              value={recipeData.img_url}
              name="img_url"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="ps-2 mb-3" controlId="ingredients">
          <Col>
            <Form.Label>
              Add Ingredient information (Name, amount, unit of measure,
              calories per serving)
            </Form.Label>
            {recipeData.ingredients.map((ingredientData, index) => (
              <Col md={5} key={index}>
                <Row>
                  <Col md={3}>
                    <Form.Control
                      placeholder="Name"
                      value={ingredientData.ingredient_name || ""}
                      name="ingredient_name"
                      onChange={(e) => handleIngredientChange(index, e)}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      placeholder="Calories"
                      value={ingredientData.cal_per_serving || ""}
                      name="cal_per_serving"
                      onChange={(e) => handleIngredientChange(index, e)}
                    />
                  </Col>
                  <Col md={4}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Quantity"
                        value={ingredientData.quantity || ""}
                        name="quantity"
                        onChange={(e) => handleIngredientChange(index, e)}
                      />
                      <DropdownButton
                        split
                        variant="outline-secondary"
                        title={recipeData.ingredients[index].units}
                        align="end"
                        id={"dropdownbutton" + (index + 1)}
                        onSelect={(e) => handleIngredientUnts(index, e)}
                      >
                        {units.map((unit) => (
                          <Dropdown.Item eventKey={unit}>{unit}</Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    {index ? (
                      <Button className=" mb-2 " onClick={removeIngredient}>
                        Remove
                      </Button>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            ))}
          </Col>
        </Form.Group>
        <Col sm={5} className="text-end">
          <Button className=" mb-2 " onClick={addIngredient}>
            Add Ingredient
          </Button>{" "}
          <Button type="submit" className=" mb-2 ">
            Submit
          </Button>{" "}
          <Button type="Cancle" className=" mb-2" onClick={handleCancle}>
            Cancle
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default EditRecipe;

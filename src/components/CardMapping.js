import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import SideBar from "./SideBar";

function CardMapping({ recipeArray }) {
  let removeButton = false;
  let addButton = false;
  let editButton = false;
  let userBox = JSON.parse(sessionStorage.getItem("box"));
  let userOwned = JSON.parse(sessionStorage.getItem("userOwned"));
  return (
    <Container fluid>
      <Row className="show-grid">
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10}>
          <Row className="show-grid">
            <Col lg={12}>
              <Row className="show-grid">
                {recipeArray.map((recipe) => {
                  if (typeof userBox != "undefined") {
                    if (userBox.includes(recipe.id)) {
                      removeButton = true;
                    } else {
                      addButton = true;
                    }
                  }
                  if (typeof userOwned != "undefined") {
                    if (userOwned.includes(recipe.id)) {
                      editButton = true;
                    }else{
                      editButton = false;
                    }
                  }

                  return (
                    <RecipeCard
                      key={recipe.id}
                      recipe_name={recipe.recipe_name}
                      serving_size={recipe.serving_size}
                      updated={recipe.updated_at}
                      img_url={recipe.img_url}
                      category_name={recipe.category.category_name}
                      ingredients_list={recipe.recipe_ingredients}
                      cal_per_serving={recipe.cal_per_serving}
                      recipe_id={recipe.id}
                      removeButton={removeButton}
                      addButton={addButton}
                      editButton={editButton}
                    />
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CardMapping;

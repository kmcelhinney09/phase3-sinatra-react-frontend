import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import SideBar from "./SideBar";

function CardMapping({ recipeArray, inUserBox}) {
  let removeButton = false;  
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10}>
          <Row >
            <Col lg={12}>
              <Row>
                {recipeArray.map((recipe) => {
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
                      inUserBox={inUserBox}
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

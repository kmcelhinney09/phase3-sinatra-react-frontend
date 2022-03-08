import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import SideBar from "./SideBar";
import { Container, Row, Col } from "react-bootstrap";

function User({ user_id, name }) {
  const [userRecipeBoxData, setUserRecipeBoxData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/users/${user_id}/recipe_box`)
      .then((res) => res.json())
      .then((data) => {
        setUserRecipeBoxData(data);
      });
  }, [user_id]);

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
                {userRecipeBoxData.map((recipe) => (
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
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default User;

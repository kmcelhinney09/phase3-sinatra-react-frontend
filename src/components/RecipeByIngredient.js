import React, { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import SideBar from './SideBar';
import { Container, Row, Col, } from 'react-bootstrap'
import { useParams } from "react-router-dom"

function RecipeByIngredient() {
    let { ingredientName } = useParams();
    const [recipeByIngredient, setrecipeByIngredient] = useState([])
    useEffect(() => {
        fetch(`http://localhost:9292/recipes/ingredient/${ingredientName}`)
            .then(res => res.json())
            .then((ingredientData) => {
              setrecipeByIngredient(ingredientData)
            })
            .catch(error => console.log(error))
    }, [ingredientName])

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
                {recipeByIngredient.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe_name={recipe.recipe_name}
                    serving_size={recipe.serving_size}
                    updated={recipe.updated_at}
                    img_url={recipe.img_url}
                    category_name={recipe.category.category_name}
                    ingredients_list={recipe.recipe_ingredients}
                    cal_per_serving={recipe.cal_per_serving}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    )
}

export default RecipeByIngredient
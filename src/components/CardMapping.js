import { Container, Row, Col, } from 'react-bootstrap'
import RecipeCard from './RecipeCard'
import SideBar from './SideBar'

import React from 'react'

function CardMapping({ recipeArray }) {
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
                {recipeArray.map((recipe) => (
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

export default CardMapping
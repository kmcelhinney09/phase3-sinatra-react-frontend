import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SideBar from "./SideBar";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import Reviews from "./Reviews";
import AddReview from "./AddReview";

function RecipeView() {
  let { recipeId } = useParams();
  let user = JSON.parse(sessionStorage.getItem("user"));
  const history = useHistory();

  const [addReview, setAddReview] = useState(false);
  const [reviewDeleted, setReviewDeleted] = useState([])

  const [recipeData, setRecipeData] = useState({
    recipe_name: "",
    cal_per_serving: 0,
    category_name: "",
    creator_id: 0,
    ingredients: [],
    directions: "",
    img_url: "",
    serving_size: "",
    last_updated: "",
  });
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/recipes/${recipeId}`)
      .then((res) => res.json())
      .then((recipe_data) => {
        setRecipeData({
          recipe_name: recipe_data.recipe_name,
          cal_per_serving: recipe_data.cal_per_serving,
          category_name: recipe_data.category.category_name,
          creator_id: recipe_data.creator_id,
          ingredients: recipe_data.recipe_ingredients,
          directions: recipe_data.directions,
          img_url: recipe_data.img_url,
          serving_size: recipe_data.serving_size,
          last_updated: recipe_data.updated_at,
        });

        setReviewData(recipe_data.reviews);
      });
  }, [addReview, reviewDeleted]);

  function handleOnClick() {
    const push_address = `/recipes/${recipeId}/edit`;
    history.push({
      pathname: push_address,
      state: { recipeData: recipeData, recipeId: recipeId },
    });
  }

  function handleReviewRemoved(id){
    const newReviewList = reviewData.filter(review => review.id !== id)
    setReviewDeleted(newReviewList)
  }

  return (
    <Container fluid>
      {console.log(reviewData)}
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col>
          <Row>
            <Col>
              <Row>
                <h1 className="text-center">{recipeData.recipe_name}</h1>
                <Row md="auto">
                  <Col md={4}>
                    <img
                      src={recipeData.img_url}
                      height="500"
                      width="250"
                      style={{ objectFit: "cover" }}
                      alt="food from recipe"
                    ></img>
                  </Col>
                  <Col md={8}>
                    <Row md="auto">
                      <Col md={12}>
                        <ListGroup>
                          <ListGroup.Item
                            variant="secondary"
                            className="text-center font-weight-bold"
                          >
                            General Recipe Information
                          </ListGroup.Item>
                          <ListGroup.Item variant="primary">
                            Serving Size: {recipeData.serving_size}
                          </ListGroup.Item>
                          <ListGroup.Item variant="primary">
                            Calories Per Serving: {recipeData.cal_per_serving}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col md={12}>
                        <ListGroup variant="flush primary">
                          <ListGroup.Item className="text-center font-weight-bold">
                            Ingredients
                          </ListGroup.Item>
                          {recipeData.ingredients.map(
                            (ingredientsData, index) => {
                              return (
                                <ListGroup.Item
                                  key={index}
                                  className="text-center"
                                >
                                  {`${ingredientsData.quantity} ${ingredientsData.units} - ${ingredientsData.ingredient.ingredient_name}  `}
                                  <small className="text-muted">
                                    (
                                    {`Calories per Serving: ${ingredientsData.ingredient.cal_per_serving}`}
                                    )
                                  </small>
                                </ListGroup.Item>
                              );
                            }
                          )}
                        </ListGroup>
                      </Col>
                      <Col>
                        {user.id === recipeData.creator_id ? (
                          <Button
                            variant="outline-success"
                            onClick={handleOnClick}
                          >
                            Edit Recipe
                          </Button>
                        ) : null}
                        <Button
                          variant="outline-success"
                          onClick={() => setAddReview(true)}
                        >
                          Add Review
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      {addReview ? (
                        <AddReview setAddReview={() => setAddReview()} />
                      ) : null}
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <h1 className="text-center">Directions</h1>
                </Row>
                <p>{recipeData.directions}</p>
              </Row>
            </Col>
            <Row>
              <h1 className="text-center">Reviews</h1>
              {reviewData.length === 0 ? (
                <>
                  <hr />
                  <h3 className="text-center">No Review Yet</h3>
                </>
              ) : (
                reviewData.map((review, index) => {
                  return (
                    <Reviews
                      key={index}
                      reviewerName={review.user.name}
                      reviewText={review.review_text}
                      updated_at={review.updated_at}
                      reviewerId={review.user_id}
                      reviewId={review.id}
                      handleReviewRemoved={handleReviewRemoved}
                    />
                  );
                })
              )}
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeView;

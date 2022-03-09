import { useEffect, useState } from "react";
import { Row, Col, Card, ButtonGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function RecipeCard({
  recipe_name,
  serving_size,
  updated,
  img_url,
  category_name,
  ingredients_list,
  cal_per_serving,
  recipe_id,
  removeButton,
  addButton,
  editButton
}) {
  const history = useHistory();
    
  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days";
  }

  let timeSinceEdit = msToTime(Date.now() - Date.parse(updated));

  function handleClick(id) {
    const pushed_address = `/recipe/${id}`;
    history.push(pushed_address);
  }

  function handleAdd(id){
      
  }

  return (
    <Col md={4}>
      <Card
        className="hover-shadow"
        onClick={() => handleClick(recipe_id)}
        style={{ cursor: "pointer" }}
      >
        <Row className="g-0">
          <Col md={4}>
            <Card.Img src={`${img_url}`} />
          </Col>
          <Col md={8}>
            <Card.Body className="text-center">
              <Card.Title className="text-primary">{recipe_name}</Card.Title>
              <Card.Subtitle className="text-success">
                {category_name}
              </Card.Subtitle>
              <Card.Text>
                {`Serving Size: ${serving_size}`}
                <br />
                <small className="text-muted">{`Calories per Serving: ${cal_per_serving}`}</small>
              </Card.Text>
              <Card.Text>
                <small className="text-muted">{`Number of ingredients: ${ingredients_list.length}`}</small>
                <br />
                <br />
                <br />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <ButtonGroup>
                {addButton ? (
                  <Button variant="outline-success" onClick={() => handleAdd(recipe_id)}>Add</Button>
                ) : null}
                {editButton ? (
                  <Button variant="outline-success">Edit</Button>
                ) : null}
                {removeButton ? (
                  <Button variant="outline-success">Remove</Button>
                ) : null}
              </ButtonGroup>
              <br />
              {`Last Edited: ${timeSinceEdit}`}
            </Card.Footer>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default RecipeCard;

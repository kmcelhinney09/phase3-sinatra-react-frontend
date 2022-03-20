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
  inUserBox,
  handleChangeInBox,
}) {
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user"));


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

  function handleRecipeClick(id) {
    const pushed_address = `/recipe/${id}`;
    history.push(pushed_address);
  }

  function handleAdd(id) {
    fetch(`http://localhost:9292/users/${user.id}/recipe_box`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe_id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleChangeInBox([...inUserBox,id])
        const pushed_address = `/users/${user.id}`;
        history.push(pushed_address);        
      });
  }

  function handleRemoveClick(){
    fetch(`http://localhost:9292/users/${user.id}/recipe_box/${recipe_id}`, {
      method: "DELETE",      
      })
      .then(res => res.json())
      .then(deletedRecipe => {
        const newUserBox = inUserBox.filter(inBoxId => inBoxId !== recipe_id)
        handleChangeInBox(newUserBox)
      })
  }

  return (
    <Col md={4}>
      <Card className="hover-shadow" style={{ cursor: "pointer" }}>
        <Row className="g-0">
          <Col md={4}>
            <Card.Img src={`${img_url}`} />
          </Col>
          <Col md={8}>
            <Card.Body
              className="text-center"
              onClick={() => handleRecipeClick(recipe_id)}
            >
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
                {!inUserBox.includes(recipe_id) ? (
                  <Button
                    variant="outline-success"
                    onClick={() => handleAdd(recipe_id)}
                  >
                    Add
                  </Button>
                ) : null}
                {inUserBox.includes(recipe_id) ? (
                  <Button variant="outline-success" onClick={handleRemoveClick}>Remove</Button>
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

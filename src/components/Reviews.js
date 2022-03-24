import { Row, Col, Button } from "react-bootstrap";
function Reviews({ reviewerName, reviewText, updated_at, reviewerId, reviewId, handleReviewRemoved}) {
  const splitDate = updated_at.split("-");
  const year = splitDate[0];
  const month = splitDate[1];
  const day = splitDate[2].substr(0, 2);

  const user = JSON.parse(sessionStorage.getItem("user"))
  const fetchUrl = process.env.REACT_APP_SERVER

  function handleDeleteClick(){
    fetch(`${fetchUrl}/reviews/${reviewId}`, {
      method: "DELETE",
    })
    .then(res => res.json())
      .then(deletedReview => {
        handleReviewRemoved(reviewId)
      })
  }

  return (
    <Row>
      <Col>
        <h4>{`${reviewerName}-`}</h4>
      </Col>
      <Row>
        <Col>
          <p className="ps-5">{reviewText}</p>
          <small>{`Last updated at: ${month}-${day}-${year}`}</small>
          <hr />
        </Col>
        <Col>
        {reviewerId===user.id?<Button variant="outline-success" onClick={handleDeleteClick}>Delete</Button>:null}
        </Col>
      </Row>
    </Row>
  );
}

export default Reviews;

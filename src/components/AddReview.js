import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function AddReview({ setAddReview }) {
  const [reviewData, setReviewData] = useState("");
  let { recipeId } = useParams();

  function handleRevewTextChange(e) {
    setReviewData(e.target.value);
  }

  function handleCancleClick() {
    setAddReview(false);
  }

  const user = JSON.parse(sessionStorage.getItem("user"));

  function handleReviewSubmit(e) {
    e.preventDefault();
    const postReviewMessage = {
      user_id: user.id,
      recipe_id: recipeId,
      review_text: reviewData,
    };

    fetch("http://localhost:9292/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postReviewMessage),
    })
      .then((res) => res.json())
      .then((confirm) => {
        setReviewData("")
        setAddReview(false)
      });
  }

  return (
    <div>
      <Form
        className="rounded p-2 sm-6"
        onSubmit={(e) => handleReviewSubmit(e)}
      >
        <Form.Group className="mb-6" controlId="reviewText">
          <Form.Control
            as="textarea"
            placeholder="Enter Review Here"
            onChange={(e) => handleRevewTextChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Button variant="primary" onClick={handleCancleClick}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default AddReview;

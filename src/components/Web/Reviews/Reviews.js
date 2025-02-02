import { Container, Image } from "semantic-ui-react";
import { reviewsData } from "./Reviews.data";
import "./Reviews.scss";

export function Reviews() {
  return (
    <Container className="reviews">
      <h2>Some of my co-workers reviews</h2>
      <div className="reviews__list">
        {reviewsData.map((review, index) => (
          <div key={index}>
            <p>{review.comment}</p>
            <div className="reviews__list-user">
              <Image src={review.avatar} avatar />
              <div>
                <span>{review.userName}</span>
                <span>{review.userType}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

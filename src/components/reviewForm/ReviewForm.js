import React from 'react';
import { Form, Button } from 'react-bootstrap';
import StarRating from '../starRating/StarRating';  // Ensure the path is correct

const ReviewForm = ({ handleSubmit, revText, labelText, rating, setRating }) => {
  return (
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label className="form-label">{labelText}</label>
              <textarea ref={revText} className="form-control" rows="3" required></textarea>
          </div>
          <div className="mb-3">
              <label className="form-label">Rate the movie</label>
              <StarRating onRatingSelected={setRating} />
          </div>
          <button type="submit" className="btn btn-outline-info">Submit</button>
      </form>
  );
}


export default ReviewForm;

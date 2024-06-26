import React from 'react';
import StarRating from '../starRating/StarRating';  

const ReviewForm = ({ handleSubmit, revText, labelText, rating, setRating }) => {
  return (
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label className="form-label">{labelText}</label>
              <textarea ref={revText} className="form-control" rows="3" required></textarea>
          </div>
          <div className="mb-3">
              <label className="form-label">Оценить фильм</label>
              <StarRating onRatingSelected={setRating} />
          </div>
          <button type="submit" className="btn btn-outline-info">Подтвердить</button>
      </form>
  );
}


export default ReviewForm;

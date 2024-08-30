import Card from 'react-bootstrap/Card';
import ErrorMessage from './ErrorMessage';
import RecipeStats from './RecipeStats';
import { useEffect } from 'react';
import Loader from './Loader';

export default function RecipeDetails({
  recipe,
  ingredients,
  steps,
  isLoading,
  detailsError,
  onHideDetails,
  onAddBookmark,
  bookmarks,
}) {
  const { id, title, author, image, readyTime, servings } = recipe;

  const isBookmarked =
    bookmarks.filter((bookmark) => bookmark.recipe.id === id).length > 0;

  useEffect(
    function () {
      if (!title) return;
      document.title = `FoodFinder | ${title}`;

      return function () {
        document.title = 'FoodFinder';
      };
    },
    [title]
  );

  return (
    <Card
      style={{ height: '85vh' }}
      className="overflow-auto mt-3 position-relative recipe-details"
    >
      <div className="d-flex justify-content-between">
        <button
          className="d-inline-block d-lg-none details-btn-left btn btn-success mt-1 ms-1 d-flex jusitfy-content-center px-2"
          onClick={onHideDetails}
        >
          <box-icon type="solid" name="chevron-left" color="white"></box-icon>
        </button>
        <button
          className="btn btn-success details-btn-right mt-1 me-1 px-2 d-flex jusitfy-content-center"
          onClick={() =>
            onAddBookmark(
              { id, title, author, image, readyTime, servings },
              ingredients,
              steps
            )
          }
        >
          <box-icon
            name="bookmark"
            type={isBookmarked ? 'solid' : 'regular'}
            color="white"
          ></box-icon>
        </button>
      </div>
      <div className="d-flex flex-column flex-sm-row border-bottom border-3">
        <img className="recipe-details-img" src={image} alt={title} />
        <div className=" px-2 px-sm-2 pt-3 pt-sm-2 w-100 text-center">
          <Card.Title className="pb-2 mt-4 fs-4">{title}</Card.Title>
          <Card.Subtitle className="pb-5 text-muted">{author}</Card.Subtitle>
          <RecipeStats readyTime={readyTime} servings={servings} />
        </div>
      </div>
      {isLoading && <Loader />}
      {!isLoading && !detailsError && (
        <Card.Body>
          <h5>Ingredients</h5>
          <ul>
            {ingredients.map((ingredient, i) => (
              <li key={`ingredient${i}`}>{ingredient}</li>
            ))}
          </ul>
          <h5>Instructions</h5>
          <ol>
            {steps.map((step, i) => (
              <li key={`step${i}`}>{step}</li>
            ))}
          </ol>
        </Card.Body>
      )}
      {detailsError && <ErrorMessage msg={detailsError} />}
    </Card>
  );
}

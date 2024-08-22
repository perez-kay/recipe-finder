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
}) {
  const { title, author, image, readyTime, servings } = recipe;

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
      <button
        className="d-inline-block d-lg-none btn btn-success btn-back mt-1 ms-1 d-flex jusitfy-content-center"
        onClick={onHideDetails}
      >
        <box-icon type="solid" name="chevron-left" color="white"></box-icon>
      </button>
      <div className="d-flex flex-column flex-sm-row border-bottom border-3">
        <img className="recipe-details-img" src={image} alt={title} />
        <div className=" px-2 px-sm-2 pt-3 pt-sm-2 w-100 text-center">
          <Card.Title className="pb-2">{title}</Card.Title>
          <Card.Subtitle className="pb-4 text-muted">{author}</Card.Subtitle>
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

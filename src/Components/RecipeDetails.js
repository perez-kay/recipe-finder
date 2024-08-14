import { Card } from 'react-bootstrap';
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
    <Card style={{ height: '85vh' }} className="overflow-auto mt-3">
      {detailsError ? (
        <ErrorMessage msg={detailsError} />
      ) : (
        <>
          <div className="d-flex border-bottom border-3">
            <img src={image} alt={title} />
            <div className="ps-2 pt-2">
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="pb-4 text-muted">
                {author}
              </Card.Subtitle>
              <RecipeStats readyTime={readyTime} servings={servings} />
            </div>
          </div>
          {isLoading && <Loader />}
          {!isLoading && (
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
        </>
      )}
    </Card>
  );
}

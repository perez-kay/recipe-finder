import Card from 'react-bootstrap/Card';
import ErrorMessage from './ErrorMessage';
import Button from './Button';
import RecipeStats from './RecipeStats';
import { useEffect } from 'react';
import Loader from './Loader';
import RecipeSteps from './RecipeSteps';
import RecipeIngredients from './RecipeIngredients';

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
  const { id, title, author, image, readyInMinutes, servings } = recipe;

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
        <Button
          extraClass="d-inline-block d-lg-none details-btn-left mt-1 ms-1 d-flex "
          onClick={onHideDetails}
        >
          <i className="bi bi-arrow-left"></i>
        </Button>
        <Button
          extraClass="details-btn-right mt-1 me-1"
          onClick={() => onAddBookmark(recipe, ingredients, steps)}
        >
          <i
            className={`bi ${
              isBookmarked ? 'bi-bookmark-x-fill' : 'bi-bookmark-plus'
            }`}
          ></i>
        </Button>
      </div>
      <div className="d-flex flex-column flex-sm-row border-bottom border-3">
        <img className="recipe-details-img" src={image} alt={title} />
        <div className=" px-2 px-sm-2 pt-3 pt-sm-2 w-100 text-center">
          <Card.Title className="pb-2 mt-4 fs-4">{title}</Card.Title>
          <Card.Subtitle className="pb-5 text-muted">{author}</Card.Subtitle>
          <RecipeStats readyInMinutes={readyInMinutes} servings={servings} />
        </div>
      </div>
      {isLoading && <Loader />}
      {!isLoading && !detailsError && (
        <Card.Body>
          <RecipeIngredients ingredients={ingredients} />
          <RecipeSteps steps={steps} />
        </Card.Body>
      )}
      {detailsError && <ErrorMessage msg={detailsError} />}
    </Card>
  );
}

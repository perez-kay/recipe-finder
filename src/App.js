import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from './Components/NavBar';
import Loader from './Components/Loader';
import RecipeDetails from './Components/RecipeDetails.js';
import ErrorMessage from './Components/ErrorMessage';
import Recipe from './Components/Recipe';
import LeftContainer from './Components/LeftContainer.js';
import WelcomeMessage from './Components/WelcomeMessage.js';
import { useState } from 'react';
import BookmarkList from './Components/BookmarkList.js';

const API_KEY = process.env.REACT_APP_API_KEY;

function filterResults(results) {
  return results.map((recipe) => {
    const { title, id, creditsText, image, readyInMinutes, servings } = recipe;
    const filtered = {
      title,
      id,
      author: creditsText,
      image,
      readyInMinutes,
      servings,
    };
    return filtered;
  });
}

export default function App() {
  // recipe related, used all around
  const [recipe, setRecipe] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  // used by NavBar and required for fetching recipeList
  const [query, setQuery] = useState('');

  // bools for showing/hiding
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // recipeList loading
  const [isListLoading, setIsListLoading] = useState(false);

  // recipe details (steps and ingredients) loading
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  // recipeList error
  const [listError, setListError] = useState('');
  // steps/ingredients error
  const [detailsError, setDetailsError] = useState('');

  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  function handleAddBookmark(recipe, ingredients, steps) {
    const newBookmark = { recipe, ingredients, steps };
    const containsBookmark =
      bookmarks.filter(
        (bookmark) => bookmark.recipe.id === newBookmark.recipe.id
      ).length > 0;
    if (containsBookmark) {
      setBookmarks((bookmarks) =>
        bookmarks.filter(
          (bookmark) => bookmark.recipe.id !== newBookmark.recipe.id
        )
      );
    } else {
      setBookmarks((bookmark) => [...bookmark, newBookmark]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    setShowWelcome(false);
    setShowDetails(false);
    setShowBookmarks(false);
    setIsListLoading(true);
    (async function () {
      try {
        setListError('');
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=7&apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true`
        );
        if (res.status === 402)
          throw new Error('API call limit exceeded. Come back tomorrow!');
        if (!res.ok)
          throw new Error('Something went wrong when fetching your recipes.');
        const data = await res.json();
        if (data.results.length === 0)
          throw new Error(
            'No recipes with that search term exist. Maybe you should create your own!'
          );
        setRecipeList(filterResults(data.results));
      } catch (err) {
        setListError(err.message);
      } finally {
        setIsListLoading(false);
      }
    })();
    setRecipe(null);
  }

  function handleSetRecipe(recipe) {
    setRecipe(recipe);
    setShowDetails(true);
    async function fetchDetails() {
      try {
        setDetailsError('');
        setIsDetailsLoading(true);
        const resIng = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
        );
        if (resIng.status === 402)
          throw new Error('API call limit exceeded. Come back tomorrow!');
        if (!resIng.ok)
          throw new Error(
            'Something went wrong when fetching the ingredients list.'
          );
        const dataIng = await resIng.json();
        const ingredients = dataIng.extendedIngredients.map(
          (ingredient) => ingredient.original
        );
        setIngredients(ingredients);

        const resSteps = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?apiKey=${API_KEY}`
        );
        if (resSteps.status === 402)
          throw new Error('API call limit exceeded. Come back tomorrow!');
        if (!resSteps.ok)
          throw new Error(
            'Something went wrong when fetching the instructions.'
          );
        const [dataSteps] = await resSteps.json();
        const steps = dataSteps.steps.map((step) => step.step);
        setSteps(steps);
      } catch (err) {
        setDetailsError(err.message);
      } finally {
        setIsDetailsLoading(false);
      }
    }
    fetchDetails();
  }

  function handleShowBookmarkedRecipe(bookmark) {
    setRecipe(bookmark.recipe);
    setIngredients(bookmark.ingredients);
    setSteps(bookmark.steps);
  }

  function handleHideDetails() {
    setShowDetails(false);
  }

  function handleShowBookmarks() {
    setShowBookmarks(true);
    setShowWelcome(false);
  }

  return (
    <div>
      <NavBar
        onSubmit={handleSubmit}
        query={query}
        setQuery={setQuery}
        onShowBookmarks={handleShowBookmarks}
      />
      <Container fluid="lg">
        {showWelcome ? (
          <WelcomeMessage />
        ) : (
          <Row>
            <Col lg={6} className={showDetails && 'd-none d-lg-block'}>
              <LeftContainer>
                {isListLoading && <Loader />}
                {!isListLoading && !listError && showBookmarks && (
                  <BookmarkList
                    bookmarks={bookmarks}
                    onShowBookmarked={handleShowBookmarkedRecipe}
                  />
                )}
                {!isListLoading && !listError && !showBookmarks && (
                  <>
                    {recipeList.map((recipe) => (
                      <Recipe
                        onSelectRecipe={handleSetRecipe}
                        recipe={recipe}
                        key={recipe.id}
                      />
                    ))}
                  </>
                )}

                {listError && <ErrorMessage msg={listError} />}
              </LeftContainer>
            </Col>
            <Col lg={6}>
              {showDetails && (
                <RecipeDetails
                  recipe={recipe}
                  ingredients={ingredients}
                  steps={steps}
                  isLoading={isDetailsLoading}
                  detailsError={detailsError}
                  onHideDetails={handleHideDetails}
                  onAddBookmark={handleAddBookmark}
                  bookmarks={bookmarks}
                />
              )}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

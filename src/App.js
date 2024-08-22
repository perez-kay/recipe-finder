import 'boxicons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from './Components/NavBar';
import Loader from './Components/Loader';
import RecipeDetails from './Components/RecipeDetails.js';
import ErrorMessage from './Components/ErrorMessage';
import Recipe from './Components/Recipe';
import { useState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

function filterResults(results) {
  return results.map((recipe) => {
    const { title, id, creditsText, image, readyInMinutes, servings } = recipe;
    const filtered = {
      title,
      id,
      creditsText,
      image,
      readyInMinutes,
      servings,
    };
    return filtered;
  });
}

export default function App() {
  const [recipe, setRecipe] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [listError, setListError] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [query, setQuery] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    setShowWelcome(false);
    (async function () {
      try {
        setListError('');
        setIsListLoading(true);
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

  function handleHideDetails() {
    setShowDetails(false);
  }

  return (
    <div>
      <NavBar onSubmit={handleSubmit} query={query} setQuery={setQuery} />
      <Container fluid="lg">
        {showWelcome ? (
          <WelcomeMessage />
        ) : (
          <Row>
            <Col lg={6} className={showDetails && 'd-none d-lg-block'}>
              <LeftContainer>
                {isListLoading && <Loader />}
                {!isListLoading && !listError && (
                  <RecipeList
                    recipeList={recipeList}
                    onSelectRecipe={handleSetRecipe}
                  />
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
                />
              )}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

function LeftContainer({ children }) {
  return (
    <div
      className="overflow-auto border rounded mt-3"
      style={{ height: '85vh' }}
    >
      {children}
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="text-center">
      <h1 className="my-3">Welcome to FoodFinder!</h1>
      <h3 className="my-4 mx-2">Feeling hungry? Search for a recipe!</h3>
      <h4>🍔 🥗 🍲 🍖 🍜 🍚 🌮 🍳</h4>
    </div>
  );
}

function RecipeList({ recipeList, onSelectRecipe }) {
  return (
    <ul className="list-unstyled">
      {recipeList.map((recipe) => (
        <Recipe
          onSelectRecipe={onSelectRecipe}
          title={recipe.title}
          image={recipe.image}
          author={recipe.creditsText}
          servings={recipe.servings}
          id={recipe.id}
          readyTime={recipe.readyInMinutes}
          key={recipe.id}
        />
      ))}
    </ul>
  );
}

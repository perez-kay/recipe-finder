import './App.css';
import 'boxicons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

export default function App() {
  const [recipe, setRecipe] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [listError, setListError] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const [query, setQuery] = useState('');

  function filterResults(results) {
    return results.map((recipe) => {
      const { title, id, creditsText, image, readyInMinutes, servings } =
        recipe;
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

  function handleSubmit(e) {
    e.preventDefault();
    (async function () {
      try {
        setListError('');
        setIsListLoading(true);
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=2&apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true`
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

  return (
    <div>
      <NavBar onSubmit={handleSubmit} query={query} setQuery={setQuery} />
      <Container>
        <Row>
          <Col>
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
          <Col>
            {recipe && (
              <RecipeDetails
                recipe={recipe}
                ingredients={ingredients}
                steps={steps}
                isLoading={isDetailsLoading}
                detailsError={detailsError}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function NavBar({ onSubmit, query, setQuery }) {
  return (
    <Navbar>
      <Container fluid>
        <Navbar.Brand className="fw-bold">
          <span>🍽️</span>FoodFinder
        </Navbar.Brand>
        <SearchBar onSubmit={onSubmit} query={query} setQuery={setQuery} />
        <Button>
          <box-icon type="solid" name="fridge" color="white"></box-icon>
        </Button>
      </Container>
    </Navbar>
  );
}

function SearchBar({ onSubmit, query, setQuery }) {
  return (
    <div>
      <form className="search" onSubmit={(e) => onSubmit(e)}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name="search"
          className="search-bar"
          type="text"
          placeholder="Search for a recipe"
        />
        <Button extraClass="btn-search" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}

function Button({ extraClass, children, type }) {
  return (
    <button className={`button ${extraClass}`} type={type}>
      {children}
    </button>
  );
}

function Loader() {
  return (
    <div
      className="loader text-center d-flex flex-column justify-content-center"
      style={{ height: '60vh' }}
    >
      <div className="loading-wheel align-self-center"></div>
      <h3 className="pt-3" style={{ color: '#888' }}>
        Loading
      </h3>
    </div>
  );
}

function ErrorMessage({ msg }) {
  return (
    <div className="text-center pt-3">
      <h2>
        <span>⚠️ </span>Oh no!
      </h2>
      <p>{msg}</p>
    </div>
  );
}

function LeftContainer({ children }) {
  return (
    <div className="overflow-auto border rounded" style={{ height: '90vh' }}>
      {children}
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

function Recipe({
  title,
  image,
  author,
  servings,
  id,
  readyTime,
  onSelectRecipe,
}) {
  return (
    <li
      className="recipe-list-item d-flex border-bottom border-2 align-items-start"
      onClick={() =>
        onSelectRecipe({ title, image, author, id, readyTime, servings })
      }
    >
      <img
        className=""
        src={image}
        alt={title}
        style={{ height: '20%', width: '40%' }}
      />
      <div className="recipe-card-info d-flex w-100 flex-column justify-content-between ps-3 pt-2">
        <h4>{title}</h4>
        <h6 className="text-muted pb-2">Created by {author}</h6>
        <RecipeStats readyTime={readyTime} servings={servings} />
      </div>
    </li>
  );
}

function RecipeStats({ readyTime, servings }) {
  return (
    <div className="recipe-stats text-center mt-auto d-flex justify-content-around">
      <div className="ready-time">
        <box-icon name="time-five" color="#888"></box-icon>
        <p>{readyTime} Minutes</p>
      </div>
      <div className="servings">
        <box-icon name="bowl-hot" color="#888"></box-icon>
        <p>{servings} Servings</p>
      </div>
    </div>
  );
}

function RecipeDetails({
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
    <Card style={{ height: '90vh' }} className="overflow-auto">
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

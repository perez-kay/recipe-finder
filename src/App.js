import './App.css';
import 'boxicons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

// not secure!!
const API_KEY = process.env.REACT_APP_API_KEY;

export default function App() {
  const [recipe, setRecipe] = useState({});
  const [recipeList, setRecipeList] = useState([]);

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
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=7&apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&fillIngredients=true`
      );

      const data = await res.json();
      setRecipeList(filterResults(data.results));
    })();
  }

  function handleSetRecipe(recipe) {
    setRecipe(recipe);
  }

  return (
    <div>
      <NavBar onSubmit={handleSubmit} query={query} setQuery={setQuery} />
      <Container>
        <Row>
          <Col>
            <RecipeList
              recipeList={recipeList}
              onSelectRecipe={handleSetRecipe}
            />
          </Col>
          <Col>
            <RecipeDetails recipe={recipe} />
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
        <Navbar.Brand className="fw-bold">Recipe Finder</Navbar.Brand>
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

function RecipeList({ recipeList, onSelectRecipe }) {
  return (
    <ul
      className="list-unstyled overflow-auto border rounded"
      style={{ height: '90vh' }}
    >
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
      className="d-flex border-top border-bottom align-items-start"
      onClick={() => onSelectRecipe({ title, image, author, id })}
    >
      <img
        className=""
        src={image}
        alt=""
        style={{ height: '20%', width: '40%' }}
      />
      <div className="recipe-card-info d-flex w-100 flex-column justify-content-between ps-2 pt-2">
        <h4>{title}</h4>
        <h6 className="text-muted pb-2">Created by {author}</h6>
        <div className="recipe-stats text-center mt-auto d-flex align-items-end justify-content-around">
          <div className="ready-time">
            <box-icon name="time-five" color="#888"></box-icon>
            <p>{readyTime} Minutes</p>
          </div>
          <div className="servings">
            <box-icon name="bowl-hot" color="#888"></box-icon>
            <p>{servings} Servings</p>
          </div>
        </div>
      </div>
    </li>
  );
}

function RecipeDetails({ recipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const { title, id, author, image } = recipe;

  useEffect(
    function () {
      async function fetchIngredients() {
        if (!id) return;
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        const data = await res.json();
        const ingredients = data.extendedIngredients.map(
          (ingredient) => ingredient.original
        );
        setIngredients(ingredients);
      }
      fetchIngredients();
    },
    [id]
  );

  useEffect(
    function () {
      async function fetchSteps() {
        if (!id) return;
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`
        );
        const [data] = await res.json();
        const steps = data.steps.map((step) => step.step);
        setSteps(steps);
      }
      fetchSteps();
    },
    [id]
  );

  return (
    <Card style={{ height: '90vh' }} className="overflow-auto">
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle>{author}</Card.Subtitle>
      <Card.Body>
        <h5>Ingredients</h5>
        <ul>
          {ingredients.map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
        <h5>Instructions</h5>
        <ol>
          {steps.map((step) => (
            <li>{step}</li>
          ))}
        </ol>
      </Card.Body>
    </Card>
  );
}

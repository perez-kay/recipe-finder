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
const API_KEY = '961d0e9dd29244c0ad82adaaad1c15dd';

const tempData = [
  {
    title: 'How to Make the Cheesiest Bowtie Mac and Cheese',
    id: 715595,
    preperationMinutes: 15,
    cookingMinutes: 20,
    readyInMinutes: 35,
    creditsText: 'pinkwhen.com',
    servings: 4,
    image: 'https://img.spoonacular.com/recipes/715595-312x231.jpg',
  },
  {
    title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
    id: 716429,
    preperationMinutes: 20,
    cookingMinutes: 25,
    readyInMinutes: 45,
    creditsText: 'Full Belly Sisters',
    servings: 2,
    image: 'https://img.spoonacular.com/recipes/716429-312x231.jpg',
  },
  {
    title: 'Easy Cheesy Pizza Casserole',
    id: 641893,
    preperationMinutes: null,
    cookingMinutes: null,
    readyInMinutes: 45,
    creditsText: 'foodista.com',
    servings: 6,
    image: 'https://img.spoonacular.com/recipes/641893-312x231.jpg',
  },
];

export default function App() {
  return (
    <div>
      <NavBar />
      <Container fluid>
        <Row>
          <Col>
            <RecipeList />
          </Col>
          <Col>
            <RecipeDetails />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function NavBar() {
  return (
    // <nav>
    //   <Title />
    //   <SearchBar />
    //   <Button>
    //     <box-icon type="solid" name="fridge" color="white"></box-icon>
    //   </Button>
    // </nav>
    <Navbar>
      <Container fluid>
        <Navbar.Brand className="fw-bold">Recipe Finder</Navbar.Brand>
        <SearchBar />
        <Button>
          <box-icon type="solid" name="fridge" color="white"></box-icon>
        </Button>
      </Container>
    </Navbar>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // do the fetch here
    console.log(query);
  }

  return (
    <div>
      <form className="search" onSubmit={(e) => handleSubmit(e)}>
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

function RecipeList() {
  return (
    <ul className="list-unstyled">
      {tempData.map((recipe) => (
        <Recipe
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

function Recipe({ title, image, author, servings, id, readyTime }) {
  return (
    <li className="d-flex border rounded align-items-start">
      <img className="rounded-start" src={image} alt="" width={210} />
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

const tempIngredients = [
  '1 package of Bowtie pasta cook as directed',
  '1 cup Extra Sharp Cheddar cheese',
  '1 cup Extra Sharp White Cheddar cheese',
  '1 tsp salt and pepper',
  '1/4 cup sour cream',
  '1/4 cup unsalted butter room temperature',
  'Fresh Parsley for garnish',
];

const tempSteps = [
  'Heat your oven to 350 degrees Fahrenheit, and then cook your pasta as directed.',
  'Drain.',
  'Shred the cheese.',
  'Add cooked noodles, cheese, sour cream, salt and pepper, and butter to a medium mixing bowl and stir until combined.',
  'Add to a 9 x 13 prepared casserole dish, top with extra cheese if desired, and bake for 20 minutes.',
  'Remove from oven and serve hot.',
];

function RecipeDetails({ selectedId }) {
  const [ingredients, setIngredients] = useState(tempIngredients);
  const [steps, setSteps] = useState(tempSteps);

  // useEffect(function () {
  //   async function fetchIngredients() {

  //       const res = await fetch(
  //         `https://api.spoonacular.com/recipes/715595/information?apiKey=${API_KEY}`
  //       );
  //       const data = await res.json();
  //       const ingredients = data.extendedIngredients.map(
  //         (ingredient) => ingredient.original
  //       );
  //       console.log(ingredients);
  //       setIngredients(ingredients);
  //   }
  //   fetchIngredients();
  // }, [selectedId]);

  // useEffect(
  //   function () {
  //     async function fetchSteps() {
  //       const res = await fetch(
  //         `https://api.spoonacular.com/recipes/715595/analyzedInstructions?apiKey=${API_KEY}`
  //       );
  //       const [data] = await res.json();
  //       const steps = data.steps.map((step) => step.step);
  //       console.log(steps);
  //       setSteps(steps);
  //     }
  //     fetchSteps();
  //   },
  //   [selectedId]
  // );

  return (
    <Card>
      <Card.Title>Title</Card.Title>
      <Card.Subtitle>Author</Card.Subtitle>
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

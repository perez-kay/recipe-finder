import './App.css';
import 'boxicons';

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
      <main>
        <RecipeList />
      </main>
    </div>
  );
}

function NavBar() {
  return (
    <nav>
      <Title />
      <SearchBar />
      <Button>
        <box-icon type="solid" name="fridge" color="white"></box-icon>
      </Button>
    </nav>
  );
}

function Title() {
  return <h1>Recipe Finder</h1>;
}

function SearchBar() {
  return (
    <div>
      <form className="search">
        <input
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
    <button className={`btn ${extraClass}`} type={type}>
      {children}
    </button>
  );
}

function RecipeList() {
  return (
    <div className="recipe-list">
      <ul>
        {tempData.map((recipe) => (
          <Recipe
            title={recipe.title}
            image={recipe.image}
            author={recipe.creditsText}
            servings={recipe.servings}
            id={recipe.id}
            key={recipe.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Recipe({ title, image, author, servings, id }) {
  return (
    <li className="recipe">
      <img src={image} alt={`${title}`} />
      <div className="recipe-info">
        <h2>{title}</h2>
        <h3>Created by {author}</h3>
        <h4>Serves {servings} People</h4>
      </div>
    </li>
  );
}

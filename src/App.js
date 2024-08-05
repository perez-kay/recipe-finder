import './App.css';
import 'boxicons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';

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

// function Recipe({ title, image, author, servings, id, readyTime }) {
//   return (
//     <li className="recipe-card">
//       {/* <div>
//         <img src={image} alt={`${title}`} />
//       </div>
//       <div className="recipe-info">
//         <h2>{title}</h2>
//         <p>Created by {author}</p>
//         <div className="recipe-stats">
//           <div className="servings">
//             <box-icon name="bowl-hot" color="#888"></box-icon>
//             <p>{servings} Servings</p>
//           </div>
//           <div className="ready-time">
//             <box-icon name="time-five" color="#888"></box-icon>
//             <p>{readyTime} Minutes</p>
//           </div>
//         </div>
//       </div> */}
//       <Card className="text-center">
//         <Card.Img variant="top" src={image} className="object-fit-cove" />
//         <Card.Body>
//           <Card.Title className="mb-3">{title}</Card.Title>
//           <Card.Subtitle className="text-muted">
//             Created by {author}
//           </Card.Subtitle>
//           <div className="recipe-stats">
//             <div className="ready-time">
//               <box-icon name="time-five" color="#888"></box-icon>
//               <p>{readyTime} Minutes</p>
//             </div>
//             <div className="servings">
//               <box-icon name="bowl-hot" color="#888"></box-icon>
//               <p>{servings} Servings</p>
//             </div>
//           </div>
//         </Card.Body>
//       </Card>
//     </li>
//   );
// }

function Recipe({ title, image, author, servings, id, readyTime }) {
  return (
    <li className="d-flex border rounded align-items-start">
      <img src={image} alt="" />
      <div
        style={{ height: '230px' }}
        className="recipe-card-info d-flex w-100 flex-column justify-content-between ps-2 pt-2"
      >
        <h4>{title}</h4>
        <h6 className="text-muted">Created by {author}</h6>
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

const tempInstructions = {
  name: '',
  steps: [
    {
      number: 1,
      step: 'Heat your oven to 350 degrees Fahrenheit, and then cook your pasta as directed.',
      ingredients: [
        {
          id: 20420,
          name: 'pasta',
          localizedName: 'pasta',
          image: 'https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg',
        },
      ],
      equipment: [
        {
          id: 404784,
          name: 'oven',
          localizedName: 'oven',
          image: 'https://spoonacular.com/cdn/equipment_100x100/oven.jpg',
          temperature: {
            number: 350.0,
            unit: 'Fahrenheit',
          },
        },
      ],
    },
    {
      number: 2,
      step: 'Drain.',
      ingredients: [],
      equipment: [],
    },
    {
      number: 3,
      step: 'Shred the cheese.',
      ingredients: [
        {
          id: 1041009,
          name: 'cheese',
          localizedName: 'cheese',
          image:
            'https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png',
        },
      ],
      equipment: [],
    },
    {
      number: 4,
      step: 'Add cooked noodles, cheese, sour cream, salt and pepper, and butter to a medium mixing bowl and stir until combined.',
      ingredients: [
        {
          id: 1102047,
          name: 'salt and pepper',
          localizedName: 'salt and pepper',
          image: 'salt-and-pepper.jpg',
        },
        {
          id: 20421,
          name: 'cooked pasta',
          localizedName: 'cooked pasta',
          image: 'fusilli.jpg',
        },
        {
          id: 1056,
          name: 'sour cream',
          localizedName: 'sour cream',
          image: 'sour-cream.jpg',
        },
        {
          id: 1001,
          name: 'butter',
          localizedName: 'butter',
          image: 'butter-sliced.jpg',
        },
        {
          id: 1041009,
          name: 'cheese',
          localizedName: 'cheese',
          image:
            'https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png',
        },
      ],
      equipment: [
        {
          id: 405907,
          name: 'mixing bowl',
          localizedName: 'mixing bowl',
          image:
            'https://spoonacular.com/cdn/equipment_100x100/mixing-bowl.jpg',
        },
      ],
    },
    {
      number: 5,
      step: 'Add to a 9 x 13 prepared casserole dish, top with extra cheese if desired, and bake for 20 minutes.',
      ingredients: [
        {
          id: 1041009,
          name: 'cheese',
          localizedName: 'cheese',
          image:
            'https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png',
        },
      ],
      equipment: [
        {
          id: 404635,
          name: 'casserole dish',
          localizedName: 'casserole dish',
          image:
            'https://spoonacular.com/cdn/equipment_100x100/casserole-dish.png',
        },
        {
          id: 404784,
          name: 'oven',
          localizedName: 'oven',
          image: 'https://spoonacular.com/cdn/equipment_100x100/oven.jpg',
        },
      ],
      length: {
        number: 20,
        unit: 'minutes',
      },
    },
    {
      number: 6,
      step: 'Remove from oven and serve hot.',
      ingredients: [],
      equipment: [
        {
          id: 404784,
          name: 'oven',
          localizedName: 'oven',
          image: 'https://spoonacular.com/cdn/equipment_100x100/oven.jpg',
        },
      ],
    },
  ],
};

function RecipeDetails() {
  return (
    <Card>
      <Card.Title>Title</Card.Title>
      <Card.Subtitle>Created by X</Card.Subtitle>
      <Card.Body></Card.Body>
    </Card>
  );
}

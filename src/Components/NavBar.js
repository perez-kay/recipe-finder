import Button from './Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar({ onSubmit, query, setQuery }) {
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
        <div className="input-group">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-bar px-2"
            type="search"
            placeholder="Search for a recipe"
          />
          <Button extraClass="btn-search" type="submit">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

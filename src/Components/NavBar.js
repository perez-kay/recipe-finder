import Button from './Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar({ onSubmit, query, setQuery, onShowBookmarks }) {
  return (
    <Navbar className="bg-secondary-subtle m-2 rounded py-3">
      <Container fluid>
        <Navbar.Brand className="fw-bold fs-4">
          <span>🍽️</span>
          <span className="d-none d-sm-inline">FoodFinder</span>
        </Navbar.Brand>
        <SearchBar onSubmit={onSubmit} query={query} setQuery={setQuery} />
        <Button onClick={onShowBookmarks}>
          <box-icon name="bookmarks" color="white"></box-icon>
        </Button>
      </Container>
    </Navbar>
  );
}

function SearchBar({ onSubmit, query, setQuery }) {
  return (
    <div>
      <form className="search" onSubmit={(e) => onSubmit(e)}>
        <div className="d-flex">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control search-bar me-2"
            type="text"
            placeholder="Search for a recipe"
          />
          <Button type="submit">
            <span className="d-none d-sm-inline">Search</span>
            <span className="d-flex align-self-center d-sm-none">
              <box-icon name="search" color="white"></box-icon>
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}

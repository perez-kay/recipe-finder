import Recipe from './Recipe';

function BookmarkList({ bookmarks, onShowBookmarked }) {
  if (bookmarks.length === 0)
    return <h1 className="text-center mt-3">No bookmarks</h1>;

  return (
    <>
      {bookmarks.map((bookmark) => (
        <Recipe
          onSelectRecipe={() => onShowBookmarked(bookmark)}
          recipe={bookmark.recipe}
          key={bookmark.recipe.id}
        />
      ))}
    </>
  );
}

export default BookmarkList;

import Recipe from './Recipe';

function RecipeList({ recipeList, onSetRecipe }) {
  return (
    <>
      {recipeList.map((recipe) => (
        <Recipe onSelectRecipe={onSetRecipe} recipe={recipe} key={recipe.id} />
      ))}
    </>
  );
}

export default RecipeList;

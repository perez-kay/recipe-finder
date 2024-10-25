function RecipeIngredients({ ingredients }) {
  return (
    <>
      <h5>Ingredients</h5>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={`ingredient${i}`}>{ingredient}</li>
        ))}
      </ul>
    </>
  );
}

export default RecipeIngredients;

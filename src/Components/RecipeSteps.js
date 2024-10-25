function RecipeSteps({ steps }) {
  return (
    <>
      <h5>Instructions</h5>
      <ol>
        {steps.map((step, i) => (
          <li key={`step${i}`}>{step}</li>
        ))}
      </ol>
    </>
  );
}

export default RecipeSteps;

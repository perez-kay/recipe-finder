export default function RecipeStats({ readyInMinutes, servings }) {
  return (
    <div className="recipe-stats text-center mt-auto d-flex justify-content-around">
      <div className="ready-time">
        <i className="bi bi-clock fs-4"></i>
        <p>{readyInMinutes} Minutes</p>
      </div>
      <div className="servings">
        <i className="bi bi-person fs-4"></i>
        <p>{servings} Servings</p>
      </div>
    </div>
  );
}

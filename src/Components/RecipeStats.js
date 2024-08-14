export default function RecipeStats({ readyTime, servings }) {
  return (
    <div className="recipe-stats text-center mt-auto d-flex justify-content-around">
      <div className="ready-time">
        <box-icon name="time-five" color="#888"></box-icon>
        <p>{readyTime} Minutes</p>
      </div>
      <div className="servings">
        <box-icon name="bowl-hot" color="#888"></box-icon>
        <p>{servings} Servings</p>
      </div>
    </div>
  );
}

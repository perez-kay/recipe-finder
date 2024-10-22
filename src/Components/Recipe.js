import RecipeStats from './RecipeStats';

export default function Recipe({ recipe, onSelectRecipe }) {
  const {
    title,
    image,
    creditsText: author,
    servings,
    id,
    readyInMinutes,
  } = recipe;
  return (
    <li
      className="recipe-list-item d-flex flex-sm-row flex-column border-bottom border-2 text-center text-sm-start w-100"
      onClick={() =>
        onSelectRecipe({ title, image, author, id, readyInMinutes, servings })
      }
    >
      <img className="recipe-img" src={image} alt={title} />
      <div className="recipe-card-info d-flex w-100 flex-column justify-content-between px-3 pt-3 pt-sm-2">
        <h5>{title}</h5>
        <p className="text-muted pb-1">{author}</p>
        <RecipeStats readyTime={readyInMinutes} servings={servings} />
      </div>
    </li>
  );
}

import RecipeStats from './RecipeStats';

export default function Recipe({
  title,
  image,
  author,
  servings,
  id,
  readyTime,
  onSelectRecipe,
}) {
  return (
    <li
      className="recipe-list-item d-flex flex-sm-row flex-column border-bottom border-2 text-center text-sm-start w-100"
      onClick={() =>
        onSelectRecipe({ title, image, author, id, readyTime, servings })
      }
    >
      <img className="recipe-img" src={image} alt={title} />
      <div className="recipe-card-info d-flex w-100 flex-column justify-content-between px-3 pt-3 pt-sm-2">
        <h4>{title}</h4>
        <p className="text-muted pb-2">Created by {author}</p>
        <RecipeStats readyTime={readyTime} servings={servings} />
      </div>
    </li>
  );
}

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
      className="recipe-list-item d-flex border-bottom border-2 align-items-start"
      onClick={() =>
        onSelectRecipe({ title, image, author, id, readyTime, servings })
      }
    >
      <img
        className=""
        src={image}
        alt={title}
        style={{ height: '20%', width: '40%' }}
      />
      <div className="recipe-card-info d-flex w-100 flex-column justify-content-between ps-3 pt-2">
        <h4>{title}</h4>
        <h6 className="text-muted pb-2">Created by {author}</h6>
        <RecipeStats readyTime={readyTime} servings={servings} />
      </div>
    </li>
  );
}

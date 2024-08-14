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
      <div className="h-100">
        <img
          className="recipe-img"
          src={image}
          alt={title}
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      </div>
      <div className="recipe-card-info d-flex w-100 flex-column justify-content-between px-3 pt-2">
        <h4>{title}</h4>
        <p className="text-muted pb-2">Created by {author}</p>
        <RecipeStats readyTime={readyTime} servings={servings} />
      </div>
    </li>
  );
}

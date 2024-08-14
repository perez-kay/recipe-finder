export default function ErrorMessage({ msg }) {
  return (
    <div className="text-center pt-3">
      <h2>
        <span>⚠️ </span>Oh no!
      </h2>
      <p>{msg}</p>
    </div>
  );
}

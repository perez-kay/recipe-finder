export default function Button({ extraClass, children, type, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-success ${extraClass}`}
      type={type}
    >
      {children}
    </button>
  );
}

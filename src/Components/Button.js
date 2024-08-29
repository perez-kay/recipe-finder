export default function Button({ extraClass = '', children, type, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-success d-flex justify-content-center align-items-center px-2 ${extraClass}`}
      type={type}
    >
      {children}
    </button>
  );
}

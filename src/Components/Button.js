export default function Button({ extraClass, children, type }) {
  return (
    <button className={`btn btn-success ${extraClass}`} type={type}>
      {children}
    </button>
  );
}

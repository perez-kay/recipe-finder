export default function Button({ extraClass, children, type }) {
  return (
    <button className={`button ${extraClass}`} type={type}>
      {children}
    </button>
  );
}

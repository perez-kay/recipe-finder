export default function LeftContainer({ children }) {
  return (
    <div
      className="overflow-auto border rounded mt-3"
      style={{ height: '85vh' }}
    >
      <ul className="list-unstyled">{children}</ul>
    </div>
  );
}

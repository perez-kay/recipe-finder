export default function Loader() {
  return (
    <div
      className="loader text-center d-flex flex-column justify-content-center"
      style={{ height: '60vh' }}
    >
      <div className="loading-wheel align-self-center"></div>
      <h3 className="pt-3" style={{ color: '#888' }}>
        Loading
      </h3>
    </div>
  );
}

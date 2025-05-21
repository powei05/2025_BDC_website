
export default function Cotton({ onNext }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        style={{ padding: '8px 16px', fontSize: '16px' }}
        onClick={onNext}
      >
        COTTON
      </button>
    </div>
  );
}
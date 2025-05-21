

export default function Clce({ onNext }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        style={{ padding: '8px 16px', fontSize: '16px' }}
        onClick={onNext}
      >
        CLCE
      </button>
    </div>
  );
}
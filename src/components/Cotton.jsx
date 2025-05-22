import PropTypes from 'prop-types';
export default function Cotton({ onNext }) {
  return (
    <div>
      <button
        
        onClick={onNext}
      >
        COTTON
      </button>
    </div>
  );
}

Cotton.propTypes = {
  onNext: PropTypes.func.isRequired,
};
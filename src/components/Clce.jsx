import PropTypes from 'prop-types';

export default function Clce({ onNext }) {
  return (
    <div >
      <button
      
        onClick={onNext}
      >
        CLCE
      </button>
    </div>
  );
}

Clce.propTypes = {
  onNext: PropTypes.func.isRequired,
};
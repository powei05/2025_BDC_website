import PropTypes from 'prop-types';
export default function Gel({ onNext }) {
  return (
    <div >
      <button
        
        onClick={onNext}
      >
        GEL
      </button>
    </div>
  );
}
Gel.propTypes = {
  onNext: PropTypes.func.isRequired,
};
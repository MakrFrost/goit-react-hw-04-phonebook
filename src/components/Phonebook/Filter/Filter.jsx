import PropTypes from 'prop-types';
// css

function Filter({ filter, onFilterChange }) {
  return (
    <div>
      <label>
        Find contacts by Name
        <input
          type="text"
          value={filter}
          onChange={event => onFilterChange(event.target.value)}
        />
      </label>
    </div>
  );
}

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

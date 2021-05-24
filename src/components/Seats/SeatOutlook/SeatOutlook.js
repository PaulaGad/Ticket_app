import styled from 'styled-components';
import PropTypes from 'prop-types';

const SeatOutlook = styled.div`
  border: 1px solid darkblue;
  height: calc(20px + 2vmin);
  width: calc(20px + 2vmin);
  grid-column-start: ${props => props.y + 1};
  grid-row-start: ${props => props.x + 1};
  background-color: ${props => props.color};
  @media (max-width: 1200px) {
    height: calc(10px + 2vmin);
    width: calc(10px + 2vmin);
  }
`

SeatOutlook.defaultProps = {
  color: 'white',
};

SeatOutlook.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  color: PropTypes.string,
};

export default SeatOutlook;
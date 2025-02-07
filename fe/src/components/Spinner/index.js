import PropTypes from 'prop-types';

import { StyledSpinner } from './styled';

export default function Spinner({ size = 32 }) {
  return <StyledSpinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};

import PropTypes from 'prop-types';
import { Container } from './style';
import Spinner from '../Spinner';

export default function FormGroup({ children, error = null, isLoading = false }) {
  return (
    <Container>

      <div className="form-term">
        {children}

        {isLoading && (
        <div className="loader">
          <Spinner size={16} />

        </div>
        ) }
      </div>

      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

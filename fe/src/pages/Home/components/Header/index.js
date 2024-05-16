/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Header({
  hasError,
  qtyOfcontacts,
  qtyOfFilteredContacts,
}) {
  const alignment = hasError
    ? 'flex-end'
    : (
      qtyOfcontacts > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && qtyOfcontacts > 0) && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}

        </strong>
      ) }
      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfcontacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};

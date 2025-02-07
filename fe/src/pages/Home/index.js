/* eslint-disable no-nested-ternary */

import { Container } from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import useHome from './useHome';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './SeaechNotFound';
import ContactsList from './components/ContactsList';

export default function Home() {
  const {

    isLoading,
    isLoadingDelete,
    isDeletemodalVisible,
    contactBeingDeleted,
    handleCloseContact,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
      <InputSearch
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      )}

      <Header
        hasError={hasError}
        qtyOfcontacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} /> }
      {(isListEmpty) && <EmptyList />}
      {(isSearchEmpty) && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>

          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeletemodalVisible}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"`}
            confirmLabel="Deletar"
            onCancel={handleCloseContact}
            onConfirm={handleConfirmDeleteContact}
          >

            <p>Esta ação não poderá ser desfeita</p>
          </Modal>
        </>
      )}
    </Container>
  );
}

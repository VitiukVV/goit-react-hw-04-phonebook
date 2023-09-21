import { nanoid } from 'nanoid';
import ContactForm from './form/ContactForm';
import Filter from './filter/Filter';
import { ContactList } from './contact-list/ContactList';
import { Container } from './app.style';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useState } from 'react';

export const App = () => {
  const contactsDefault = [
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useLocalStorage('contacts', contactsDefault);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const normalizeName = name.toLowerCase();

    const usedName = contacts.some(
      contact => contact.name.toLowerCase() === normalizeName
    );
    if (usedName) {
      return alert(`${name} is already in contacts!`);
    }
    const newContact = { id: nanoid(), name, number };
    setContacts(prevContact => [...prevContact, newContact]);
  };

  const changeFilter = evt => {
    setFilter(evt.target.value);
  };

  const deleteContacts = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const normalizeFilter = filter.toLowerCase();
  const filtredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={formSubmitHandler}></ContactForm>
      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={changeFilter}></Filter>
          <ContactList
            contacts={filtredContacts}
            onDeleteContacts={deleteContacts}
          ></ContactList>
        </>
      )}
    </Container>
  );
};

import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmitInForm = ({ name, number }) => {
    const { contacts } = this.state;

    const duplicateName = contacts.find(contact => contact.name === name); // searching duplicate names in input Name
    if (duplicateName) {
      alert(name + ' is already in contacts.');
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: name,
            number: number,
          },
        ],
      };
    });
  };

  handleFilterChange = event => {
    const searchedContact = event.target.value.trim().toLowerCase();
    this.setState({ filter: searchedContact });
  };

  handleDeleteBtn = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );
      return { contacts: newContacts };
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().split(' ').join('').includes(filter)
    );

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 22,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmitInForm={this.handleSubmitInForm}></ContactForm>

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.handleDeleteBtn}
        />
      </div>
    );
  }
}

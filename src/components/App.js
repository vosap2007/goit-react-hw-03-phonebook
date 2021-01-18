import React, { Component } from 'react';
import Filter from './Filter';
import Input from './Input';
import Contacts from "./Contacts";
import { v4 as uuidv4 } from 'uuid';
import styles from '../css/PhoneBook.module.css';

export default class App extends Component {

  state = {
    contacts: [],
    filter: ''
  }

  changeFilter = filter => {
    this.setState({ filter });
  };

  addContacts = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      completed: false,
      number,
    };

    if (this.state.contacts.some((e) => e.name === name))
       { alert('This contact already exists!'); }
    else {
      this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact]
      };
      });
    }
  };

  removeContacts = contactsId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter (contact =>contact.id !== contactsId),
      };
    });
  }

  getVisibleContacts = () => { 
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  componentDidUpdate (prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount () {
      const contacts = localStorage.getItem('contacts');
      const contactParst = JSON.parse(contacts);
      this.setState({ contacts: contactParst});
  }

  render() {

    const visibleContacts = this.getVisibleContacts();

  return (
    <>
      <div className={styles.box}>
        <h1 className={styles.title}>Phonebook</h1>
          <Input onAddContact={this.addContacts} />
        <h2 className={styles.title}>Contacts</h2>
        {visibleContacts.length > 1 && (
        <Filter value={this.state.filter} onChange={this.changeFilter }/>)}
        {visibleContacts.length > 0 && (<Contacts
          contacts={visibleContacts}
        onRemoveContacts={this.removeContacts }/>)}
      </div>
    </>
    );
  }
}
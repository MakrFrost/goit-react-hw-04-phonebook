// import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import Form from './Form/Form';
import Filter from './Filter/Filter';
import Contacts from './Contacts/Contacts';
import Section from './Section/Section';

let INITIAL_STATE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function Phonebook() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(INITIAL_STATE);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const onFilterChange = value => {
    setFilter(value);
  };
  const onAddContact = contact => {
    if (contacts.filter(({ name }) => name === contact.name).length !== 0) {
      alert(contact.name + 'is already in contacts!');
      return;
    }

    const newContact = {
      ...contact,
    };
    setContacts([newContact, ...contacts]);
  };
  const onDeleteContact = id => {
    setContacts(contacts => {
      contacts.filter(contact => contact.id !== id);
    });
  };
  // const filteredContact = () => {
  //   console.log(contacts);
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );

  //     console.log(contacts);
  // const filtered = contacts.filter(contact => contact.name.toLowerCase());
  // console.log(filtered, 'filtered');
  // const filteredMk2 = filtered.includes(filter.toLowerCase());
  // console.log(filteredMk2);
  // return filteredMk2;
  // };

  const normalizeFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <div>
      <Section title={'Add contact to phonebook!'}>
        <Form onAddContact={onAddContact} />
      </Section>
      <Section title={'Contacts:'}>
        <Filter filter={filter} onFilterChange={onFilterChange} />
        <Contacts contacts={filterContacts} onDeleteContact={onDeleteContact} />
      </Section>
    </div>
  );
}

// class Phonebook extends Component {
//   state = {
//     ...INITIAL_STATE,
//   };
//   onFilterChange = filter => {
//     this.setState({ filter });
//   };

//   onAddContact = contact => {
//     const { contacts } = this.state;
//     if (contacts.filter(({ name }) => name === contact.name).length !== 0) {
//       alert(contact.name + 'is already in contacts!');
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   onDeleteContact = id => {
//     this.setState(({ contacts }) => {
//       const withUpdate = contacts.filter(contact => contact.id !== id);
//       return { contacts: withUpdate };
//     });
//   };

//   filteredContact = () => {
//     const { contacts, filter } = this.state;
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.filteredContact();

//     return (
//       <div>
//         <Section title={'Add contact to phonebook!'}>
//           <Form onAddContact={this.onAddContact} />
//         </Section>
//         <Section title={'Contacts:'}>
//           <Filter filter={filter} onFilterChange={this.onFilterChange} />
//           <Contacts
//             contacts={filteredContacts}
//             onDeleteContact={this.onDeleteContact}
//           />
//         </Section>
//       </div>
//     );
//   }
// }

export default Phonebook;

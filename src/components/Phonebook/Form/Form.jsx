import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  inputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  clearForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  onFormSubmit = evt => {
    evt.preventDefault();

    const { name, number } = this.state;
    const { onAddContact } = this.props;
    onAddContact({ name, number, id: nanoid() });
    this.setState({ name, number });

    this.clearForm();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className={css.form}>
          <label className={css.label__name}>
            Name:
            <input
              value={this.state.name}
              onChange={this.inputChange}
              name="name"
              type="text"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>

          <label className={css.label__number}>
            Number:
            <input
              value={this.state.number}
              onChange={this.inputChange}
              name="number"
              type="tel"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>

          <button type="submit">Add contact!</button>
        </form>
      </div>
    );
  }
}

export default Form;

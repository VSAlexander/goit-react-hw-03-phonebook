import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  static propTypes = {
    onHandleSubmitInForm: PropTypes.func,
  };

  state = {
    name: '',
    number: '',
  };

  // ----------- Instead of doing this ------------

  // handleChangeName = event => {
  //   this.setState({ name: event.target.value });
  // };

  // handleChangeNumber = event => {
  //   this.setState({ number: event.target.value });
  // };

  // ---------- Do this (computed properties) -----------

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //-------------

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmitInForm } = this.props; // to transfer App state (contacts) and its method in this component
    onSubmitInForm(this.state); // in App method handleSubmitInForm hidden logic about adding new object to contacts and checking duplicate names

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className={css.input}
          onChange={this.handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <input
          className={css.input}
          onChange={this.handleChange}
          value={number}
          type="tel"
          name="number"
          id="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

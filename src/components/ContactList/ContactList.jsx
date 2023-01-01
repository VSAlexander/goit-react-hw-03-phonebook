import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export function ContactList({ contacts, onDelete }) {
  return (
    <ul className={css.contactList}>
      {contacts &&
        contacts.map(contact => {
          const handleDelete = () => {
            onDelete(contact.id);
          };
          return (
            <li key={contact.id}>
              <div>
                {contact.name}: {contact.number}
                <button type="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func,
};

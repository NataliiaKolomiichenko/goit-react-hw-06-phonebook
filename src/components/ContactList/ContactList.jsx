import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import PropTypes from 'prop-types'
import ContactItem from '../ContactItem/ContactItem'
import css from './ContactList.module.css'

const ContactList = () => {
    const contacts = useSelector(getContacts);
    const { filter } = useSelector(getFilter);

    const getFilteredContacts = () => {
        if (!filter) {
            return contacts
        }
        const normalizedFilter = filter.toLocaleLowerCase();
        const filteredContacts = contacts.filter(({ name }) => {
        const normalizedName = name.toLocaleLowerCase();
        return normalizedName.includes(normalizedFilter);
        })

        return filteredContacts;
    }
    
    const filteredContactsList = getFilteredContacts();

    return <ul className={css.list}>
        {filteredContactsList.map(({name, number, id}) => {
            return <ContactItem name={name} number={number} key={id} id={id} />
        })}
    </ul>
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
}

export default ContactList
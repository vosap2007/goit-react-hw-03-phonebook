import React from "react";
import styles from '../css/PhoneBook.module.css'; 

const Contacts = ({contacts, onRemoveContacts}) => (

    <ul>
        {contacts.map(contact =>
            <li className={styles.contact} key={contact.id}>
            <p className={styles.text}>{contact.name}: {contact.number}</p>
            <section className={styles.gid}>
                    <button type="button" className={styles.button}
                        onClick={() => onRemoveContacts(contact.id)}>
                        Delete</button>
            </section>
        </li>)}
    </ul>
);

export default Contacts;
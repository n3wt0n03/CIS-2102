import React, { useState } from "react";
import './styles.css';
import addContact from './functions/AddContact';
import DisplayContacts from './DisplayContact';

const Header = () => {
  const [contacts, setContacts] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = addContact();

    if (newContact) {
      // Add the new contact to the contacts array
      setContacts([...contacts, newContact]);
      console.log(newContact)
    }
  };

    // Function to update the contacts state when a contact is deleted
    const handleDeleteContact = (updatedContacts) => {
      setContacts(updatedContacts);
    };

  return (
    <div>
      <header>
        <center><h1>Contact List</h1></center>
        <form id="new-contact-form" onSubmit={handleSubmit} action="">
          <input type="text" id="lastname-input" placeholder="Lastname" />
          <input type="text" id="firstname-input" placeholder="Firstname" />
          <input type="text" id="email-input" placeholder="Email" />
          <input type="number" id="number-input" placeholder="Contact Number" />
          <input type="submit" id="new-contact-submit" value="Add contact" />
        </form>
      </header>

      <main>
        <section className="contact-list">
          <div className="title">
            <h1>Contact Tables</h1>
          </div>
          {/* Pass the contacts array to DisplayContacts */}
          <DisplayContacts contacts={contacts} onDeleteContacts={handleDeleteContact}/>
        </section>
      </main>
    </div>
  );
};

export default Header;

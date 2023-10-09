import React, { useState } from 'react';
import axios from "axios";
import DisplayContacts from './DisplayContacts';
import { addContact } from './functions/AddContacts'; // Import the addContact function
import './styles.css';

const Header = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(''); // State to store the error message

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5050/get-contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!firstName || !lastName || !email || !number) {
      alert('Please fill in all the input fields.'); // Display an alert
      return; // Exit the function if validation fails
    }

    try {
      await addContact(firstName, lastName, email, number);
      // Clear input fields after successful addition
      setFirstName('');
      setLastName('');
      setEmail('');
      setNumber('');

      // Fetch the updated contact list
      fetchContacts();
    } catch (error) {
      console.error('Error adding contact:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };


  

  return (
    <div>
      <header>
        <center>
          <h1>Contact List</h1>
        </center>
        <form id="new-contact-form" onSubmit={handleAddContact}>
          <input
            type="text"
            id="lastname-input"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            id="firstname-input"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="email-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            id="number-input"
            placeholder="Contact Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <input
            type="submit"
            id="new-contact-submit"
            value="Add contact"
          />
        </form>
      </header>

      <main>
        <section className="contact-list">
          <div className="title">
            <h1>Contact List</h1>
          </div>

          <div id="contacts">
            <DisplayContacts contacts={contacts} fetchContacts={fetchContacts} setContacts={setContacts}/>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Header;

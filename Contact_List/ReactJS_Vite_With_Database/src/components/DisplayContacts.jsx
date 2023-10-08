import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateContact } from "./functions/EditContact";
import { deleteContact } from "./functions/DeleteContact"; 

const DisplayContacts = ({ contacts, fetchContacts, setContacts }) => {
    useEffect(() => {
        // Fetch the data from your Node.js server
        axios.get("http://localhost:5050/get-contacts")
          .then((response) => {
            setContacts(response.data); // Update the contacts state
          })
          .catch((error) => {
            console.error("Error fetching contacts:", error);
          });
    }, []);

  const [editMode, setEditMode] = useState(null); // Track which contact is in edit mode
  const [editedContact, setEditedContact] = useState({}); // Store edited contact values

  const handleEdit = (index, contact) => {
    setEditMode(index);
    setEditedContact({ ...contact }); // Clone the contact to preserve original values
  };

  const handleSave = async (id) => {
    try {
      const { firstName, lastName, email, number } = editedContact;
      await updateContact(id, firstName, lastName, email, number);

      // Update the local state with the modified contact
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === id) {
          return { ...contact, firstName, lastName, email, number };
        }
        return contact;
      });

      setContacts(updatedContacts); // Update the contacts state with the modified data
      setEditMode(null);
    } catch (error) {
      console.error('Error saving contact:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id); // Delete the contact by ID
      // Filter out the deleted contact from the local state
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts); // Update the contacts state without the deleted contact
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Lastname</th>
            <th>Firstname</th>
            <th>Email</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact, index) => (
            <tr key={index}>
              <td>{editMode === index ? (
                <input
                  type="text"
                  value={editedContact.lastName}
                  onChange={(e) => setEditedContact({ ...editedContact, lastName: e.target.value })}
                />
              ) : contact.lastName}</td>
              <td>{editMode === index ? (
                <input
                  type="text"
                  value={editedContact.firstName}
                  onChange={(e) => setEditedContact({ ...editedContact, firstName: e.target.value })}
                />
              ) : contact.firstName}</td>
              <td>{editMode === index ? (
                <input
                  type="text"
                  value={editedContact.email}
                  onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
                />
              ) : contact.email}</td>
              <td>{editMode === index ? (
                <input
                  type="text"
                  value={editedContact.number}
                  onChange={(e) => setEditedContact({ ...editedContact, number: e.target.value })}
                />
              ) : contact.number}</td>
              <td>
                {editMode === index ? (
                  <button onClick={() => handleSave(contact.id)}>SAVE</button>
                ) : (
                  <button onClick={() => handleEdit(index, contact)}>EDIT</button>
                )}
              </td>
              <td><button onClick={() => handleDelete(contact.id)}>DELETE</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayContacts;

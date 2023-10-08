import React, { useState } from "react";
import { isEditingContact, UpdateContact } from "./functions/EditContact";
import { deleteContact } from "./functions/DeleteContact";

const DisplayContacts = ({ contacts, onDeleteContacts }) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedData, setEditedData] = useState([]);

  const handleEdit = (index, contact) => {
    if (isEditingContact(index, editingIndex)) {
      // Save the edited contact and exit edit mode
      const updatedContact = { ...contact, ...editedData[index] };
      UpdateContact(contacts, index, updatedContact);
      setEditingIndex(-1);
    } else {
      // Enter edit mode for this contact
      setEditingIndex(index);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...editedData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setEditedData(updatedData);
  };

  const handleDelete = (index) => {
    // Create a new array without the contact to delete
    const updatedContacts = deleteContact(contacts, index);

    // Clear edited data for the deleted contact
    const updatedData = [...editedData];
    updatedData.splice(index, 1);

    // Update the parent component's state
    onDeleteContacts(updatedContacts);
    setEditedData(updatedData);
  };

  return (
    <div>
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>Lastname</th>
            <th>Firstname</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>
                {isEditingContact(index, editingIndex) ? (
                  <input
                    type="text"
                    value={editedData[index]?.lastname || contact.lastname}
                    onChange={(e) =>
                      handleInputChange(index, "lastname", e.target.value)
                    }
                  />
                ) : (
                  isEditingContact(index, editingIndex)
                    ? editedData[index]?.lastname
                    : contact.lastname
                )}
              </td>
              <td>
                {isEditingContact(index, editingIndex) ? (
                  <input
                    type="text"
                    value={editedData[index]?.firstname || contact.firstname}
                    onChange={(e) =>
                      handleInputChange(index, "firstname", e.target.value)
                    }
                  />
                ) : (
                  isEditingContact(index, editingIndex)
                    ? editedData[index]?.firstname
                    : contact.firstname
                )}
              </td>
              <td>
                {isEditingContact(index, editingIndex) ? (
                  <input
                    type="text"
                    value={editedData[index]?.email || contact.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                ) : (
                  isEditingContact(index, editingIndex)
                    ? editedData[index]?.email
                    : contact.email
                )}
              </td>
              <td>
                {isEditingContact(index, editingIndex) ? (
                  <input
                    type="text"
                    value={editedData[index]?.number || contact.number}
                    onChange={(e) =>
                      handleInputChange(index, "number", e.target.value)
                    }
                  />
                ) : (
                  isEditingContact(index, editingIndex)
                    ? editedData[index]?.number
                    : contact.number
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(index, contact)}>
                  {isEditingContact(index, editingIndex) ? "Save" : "Edit"}
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayContacts;

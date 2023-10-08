export function UpdateContact(contacts, contactIndex, updatedContact) {
  console.log("contacts:", contacts);
  console.log("contactIndex:", contactIndex);
  console.log("updatedContact:", updatedContact);

  if (
    contacts &&
    Array.isArray(contacts) &&
    contactIndex >= 0 &&
    contactIndex < contacts.length &&
    updatedContact
  ) {
    contacts[contactIndex].lastname = updatedContact.lastname;
    contacts[contactIndex].firstname = updatedContact.firstname;
    contacts[contactIndex].email = updatedContact.email;
    contacts[contactIndex].number = updatedContact.number;
  } else {
    console.error("Invalid input data in UpdateContact function.");
  }
}

export function isEditingContact(contactIndex, editingIndex) {
  return contactIndex === editingIndex;
}

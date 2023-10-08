export function deleteContact(contacts, indexToDelete) {
  // Create a new array without the contact to delete
  const updatedContacts = [...contacts];
  updatedContacts.splice(indexToDelete, 1);

  console.log("Successfully Deleted");

  // Return the new array
  return updatedContacts;
}

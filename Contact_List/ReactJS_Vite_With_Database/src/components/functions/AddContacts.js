import axios from 'axios';

// Function to add a new contact to the database
export const addContact = async (firstName, lastName, email, number) => {
  try {
    const response = await axios.post('http://localhost:5050/add-contact', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      number: number,
    });

    return response.data; // Return the newly added contact data
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

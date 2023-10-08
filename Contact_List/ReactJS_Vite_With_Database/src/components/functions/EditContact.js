import axios from 'axios';

// Function to update a contact by ID
export const updateContact = async (id, firstName, lastName, email, number) => {
  try {
    const response = await axios.put(`http://localhost:5050/update-contact/${id}`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      number: number,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
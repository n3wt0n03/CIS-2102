import axios from 'axios';

// Function to delete a contact by ID
export const deleteContact = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5050/delete-contact/${id}`);
    return response.data; // Return the deletion success message or data
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

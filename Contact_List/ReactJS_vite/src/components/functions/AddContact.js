// Function to add contact from form inputs

function addContact() {
  const lastname = document.getElementById("lastname-input").value;
  const firstname = document.getElementById("firstname-input").value;
  const email = document.getElementById("email-input").value;
  const number = document.getElementById("number-input").value;

  if (lastname && firstname && email && number) {
    // Create a contact object
    const contact = {
      lastname,
      firstname,
      email,
      number,
    };

    // Clear the input fields
    document.getElementById("lastname-input").value = "";
    document.getElementById("firstname-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("number-input").value = "";

    return contact;
  } else {
    alert("Please fill in all fields");
    return null;
  }
}

export default addContact;

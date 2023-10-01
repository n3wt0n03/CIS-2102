displayContacts();
alert("Welcome to Contact Lists!");

var contacts = [];

// Add an editMode flag to track editing status
const editMode = {};

function displayContacts() {
  fetch("http://localhost:5050/get-contacts")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#contact-table tbody");

      // Clear the existing table rows
      tableBody.innerHTML = "";

      data.forEach((contact) => {
        const row = document.createElement("tr");
        row.id = `contact-row-${contact.conID}`;
        row.innerHTML = `
          <td class="contact-firstname">${
            editMode[contact.conID]
              ? `<input type="text" id="edit-firstname-${contact.conID}" value="${contact.firstname}">`
              : contact.firstname
          }</td>
          <td class="contact-lastname">${
            editMode[contact.conID]
              ? `<input type="text" id="edit-lastname-${contact.conID}" value="${contact.lastname}">`
              : contact.lastname
          }</td>
          <td class="contact-email">${
            editMode[contact.conID]
              ? `<input type="text" id="edit-email-${contact.conID}" value="${contact.email}">`
              : contact.email
          }</td>
          <td class="contact-conNumber">${
            editMode[contact.conID]
              ? `<input type="text" id="edit-conNumber-${contact.conID}" value="${contact.conNumber}">`
              : contact.conNumber
          }</td>
          <td>
            ${
              editMode[contact.conID]
                ? `<button onclick="saveContact(${contact.conID})">Save</button>`
                : `<button onclick="startContactEdit(${contact.conID})">Edit</button>`
            }
            <button id="delete" onclick="deleteContact(${
              contact.conID
            })">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching contact data: ", error);
    });
}

// This function adds a new contact to the database
function addContact(event) {
  event.preventDefault();

  const lastname = document.getElementById("lastname-input").value;
  const firstname = document.getElementById("firstname-input").value;
  const email = document.getElementById("email-input").value;
  const number = document.getElementById("number-input").value;

  if (lastname && firstname && email && number) {
    const contact = {
      lastname: lastname,
      firstname: firstname,
      email: email,
      conNumber: number,
    };

    fetch("http://localhost:5050/add-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new contact to the table
        addContactToTable(data);

        // Clear the input fields
        document.getElementById("lastname-input").value = "";
        document.getElementById("firstname-input").value = "";
        document.getElementById("email-input").value = "";
        document.getElementById("number-input").value = "";

        alert("Contact Added!");
      })
      .catch((error) => {
        alert("Could not add contact!");
        console.error("Error:", error);
      });
  } else {
    alert("Please fill in all fields");
  }
}

// This function adds a new contact to the table
function addContactToTable(contact) {
  const tableBody = document.querySelector("#contact-table tbody");

  const row = document.createElement("tr");
  row.id = `contact-row-${contact.conID}`;
  row.innerHTML = `
    <td class="contact-firstname">${contact.firstname}</td>
    <td class="contact-lastname">${contact.lastname}</td>
    <td class="contact-email">${contact.email}</td>
    <td class="contact-conNumber">${contact.conNumber}</td>
    <td>
    <button onclick="startContactEdit(${contact.conID})">Edit</button>
      <button id="delete" onclick="deleteContact(${contact.conID})">Delete</button>
    </td>
  `;

  tableBody.appendChild(row);
}

// Attach the event listener to the form submit button
document
  .getElementById("new-contact-form")
  .addEventListener("submit", addContact);

// Initially, display existing contacts when the page loads
displayContacts();

function editContact(conID) {
  // Set editMode for the specified contact to true
  editMode[conID] = true;
  // Refresh the table to show input fields for editing
  displayContacts();
}

function cancelEdit(conID) {
  // Set editMode for the specified contact to false
  editMode[conID] = false;
  // Refresh the table to show contact details
  displayContacts();
}

// Function to enable editing of a contact
function startContactEdit(conID) {
  // Toggle edit mode for this contact
  editMode[conID] = !editMode[conID];

  // Refresh the table to show contact details
  displayContacts();

  // Display the contact data in editable input fields or as text
  const row = document.querySelector(`#contact-row-${conID}`);
  const firstNameCell = row.querySelector(".contact-firstname");
  const lastNameCell = row.querySelector(".contact-lastname");
  const emailCell = row.querySelector(".contact-email");
  const conNumberCell = row.querySelector(".contact-conNumber");

  if (editMode[conID]) {
    const firstNameValue = firstNameCell.textContent;
    const lastNameValue = lastNameCell.textContent;
    const emailValue = emailCell.textContent;
    const conNumberValue = conNumberCell.textContent;

    firstNameCell.innerHTML = `<input type="text" id="edit-firstname-${conID}" value="${firstNameValue}">`;
    lastNameCell.innerHTML = `<input type="text" id="edit-lastname-${conID}" value="${lastNameValue}">`;
    emailCell.innerHTML = `<input type="text" id="edit-email-${conID}" value="${emailValue}">`;
    conNumberCell.innerHTML = `<input type="text" id="edit-conNumber-${conID}" value="${conNumberValue}">`;
  } else {
    // Save the edited contact data
    saveContact(conID);
  }
}

// Function to save the edited contact data
// Function to save the edited contact data
function saveContact(conID) {
  if (editMode[conID]) {
    // Get the edited values from input fields
    const updatedFirstName = document.getElementById(
      `edit-firstname-${conID}`
    ).value;
    const updatedLastName = document.getElementById(
      `edit-lastname-${conID}`
    ).value;
    const updatedEmail = document.getElementById(`edit-email-${conID}`).value;
    const updatedConNumber = document.getElementById(
      `edit-conNumber-${conID}`
    ).value;

    // Construct an object with the updated values
    const updatedContact = {
      conID: conID,
      firstname: updatedFirstName,
      lastname: updatedLastName,
      email: updatedEmail,
      conNumber: updatedConNumber,
    };

    // Send the updated contact data to the server via an HTTP PUT request
    fetch(`http://localhost:5050/update-contact/${conID}`, {
      // Use conID here
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    })
      .then((response) => response.json())
      .then((data) => {
        // Set editMode to false after saving
        editMode[conID] = false;
        // Refresh the table to show contact details
        displayContacts();
        alert("Contact Updated!");
      })
      .catch((error) => {
        alert("Could not update contact!");
        console.error("Error:", error);
      });
  } else {
    // Cancel the edit and refresh the table
    editMode[conID] = false;
    displayContacts();
  }
}

// Function to delete a contact by ID
function deleteContact(conID) {
  const confirmation = confirm("Are you sure you want to delete this contact?");

  if (confirmation) {
    fetch(`http://localhost:5050/delete-contact/${conID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // Display the server's response message
        displayContacts(); // Refresh the table to reflect the deletion
      })
      .catch((error) => {
        alert("Could not delete contact!");
        console.error("Error:", error);
      });
  }
}

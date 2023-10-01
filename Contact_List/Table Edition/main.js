alert("Welcome to Contact Lists!");

var contacts = [];

function addContact(event) {
  event.preventDefault(); // prevents from reloading when the button is clicked

  var lastname = document.getElementById("lastname-input").value;
  var firstname = document.getElementById("firstname-input").value;
  var email = document.getElementById("email-input").value;
  var number = document.getElementById("number-input").value;

  if (lastname && firstname && email && number) {
    //Create Objects
    var contact = {
      lastname: lastname,
      firstname: firstname,
      email: email,
      number: number,
    };

    console.log(contact);

    //make the objects into an array
    contacts.push(contact);

    displayContacts();

    //Clear the input fields
    document.getElementById("lastname-input").value = "";
    document.getElementById("firstname-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("number-input").value = "";
  } else {
    alert("Please fill in all fields");
  }
}

document
  .getElementById("new-contact-form")
  .addEventListener("submit", addContact);

function displayContacts() {
  var table = `<table id="contacts">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>`;

  contacts.forEach((contact, index) => {
    table += `<tr>
    <td>
    <span id="name-${index}">${
      contact.lastname + ", " + contact.firstname
    }</span>
    <input type="text" id="edit-name-${index}" style="display: none;" value="${
      contact.lastname
    }, ${contact.firstname}" />
</td>

<td>
    <span id="email-${index}">${contact.email}</span>
    <input type="text" id="edit-email-${index}" style="display: none;" value="${
      contact.email
    }" />
</td>

<td>
    <span id="number-${index}">${contact.number}</span>
    <input type="text" id="edit-number-${index}" style="display: none;" value="${
      contact.number
    }" />
</td>

<td>  
    <button id="edit" onclick="startContact(${index})">Edit</button>
    <button id="delete" onclick="deleteContact(${index})">Delete</button>
    <button id="save-${index}" style="display: none;" onclick="saveContact(${index})">Save</button>
</td>
            </tr>`;
  });

  table += `</tbody></table>`;

  document.getElementById("contact-table").innerHTML = table;
}

function startContact(index) {
  // Hide the spans and show the input fields for editing
  document.getElementById(`name-${index}`).style.display = "none";
  document.getElementById(`edit-name-${index}`).style.display = "inline-block";
  document.getElementById(`email-${index}`).style.display = "none";
  document.getElementById(`edit-email-${index}`).style.display = "inline-block";
  document.getElementById(`number-${index}`).style.display = "none";
  document.getElementById(`edit-number-${index}`).style.display =
    "inline-block";

  // Show the Save button and hide the Edit button
  document.getElementById(`save-${index}`).style.display = "inline-block";
  document.getElementsByTagName("button")[index * 3].style.display = "none";
}

function saveContact(index) {
  // Update the contact object with the edited values
  contacts[index].lastname = document.getElementById(
    `edit-name-${index}`
  ).value;
  contacts[index].firstname = contacts[index].lastname.split(", ")[1];
  contacts[index].lastname = contacts[index].lastname.split(", ")[0];
  contacts[index].email = document.getElementById(`edit-email-${index}`).value;
  contacts[index].number = document.getElementById(
    `edit-number-${index}`
  ).value;

  // Hide the input fields and show the spans
  document.getElementById(`name-${index}`).style.display = "inline-block";
  document.getElementById(`edit-name-${index}`).style.display = "none";
  document.getElementById(`email-${index}`).style.display = "inline-block";
  document.getElementById(`edit-email-${index}`).style.display = "none";
  document.getElementById(`number-${index}`).style.display = "inline-block";
  document.getElementById(`edit-number-${index}`).style.display = "none";

  // Show the Edit button and hide the Save button
  document.getElementsByTagName("button")[index * 3].style.display =
    "inline-block";
  document.getElementById(`save-${index}`).style.display = "none";

  // Update the displayed contacts
  displayContacts();
}

function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    displayContacts();
  }
}

// Limit the number of digits in the "Contact Number" input field
document.getElementById("number-input").addEventListener("input", function () {
  if (this.value.length > 11) {
    this.value = this.value.slice(0, 11);
  }
});

displayContacts();

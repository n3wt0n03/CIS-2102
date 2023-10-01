alert("Welcome to Contact Lists!");

window.addEventListener("load", () => {
  const form = document.querySelector("#new-contact-form");
  const input = document.querySelector("#new-contact-input");
  const list_cont = document.querySelector("#contacts");

  form.addEventListener("submit", (e) => {
    //stops from refreshing the page when you submit a form
    e.preventDefault();

    const contact = input.value;

    if (!contact) {
      alert("Please fill the credentials.");
      return;
    } else {
      console.log("Success");
    }

    const contact_el = document.createElement("div");
    contact_el.classList.add("contact");

    const contact_content_el = document.createElement("div");
    contact_content_el.classList.add("content");

    contact_el.appendChild(contact_content_el);

    const contact_input_el = document.createElement("input");
    contact_input_el.classList.add("text");
    contact_input_el.type = "text";
    contact_input_el.value = contact;
    contact_input_el.setAttribute("readonly", "readonly");

    contact_content_el.appendChild(contact_input_el);

    const contact_actions_el = document.createElement("div");
    contact_actions_el.classList.add("actions");

    const contact_edit_el = document.createElement("button");
    contact_edit_el.classList.add("edit");
    contact_edit_el.innerHTML = "Edit";

    const contact_delete_el = document.createElement("button");
    contact_delete_el.classList.add("delete");
    contact_delete_el.innerHTML = "Delete";

    contact_actions_el.appendChild(contact_edit_el);
    contact_actions_el.appendChild(contact_delete_el);

    contact_el.appendChild(contact_actions_el);

    list_cont.appendChild(contact_el);

    input.value = "";

    contact_edit_el.addEventListener("click", () => {
      if (contact_edit_el.innerText.toLowerCase() == "edit") {
        contact_input_el.removeAttribute("readonly");
        contact_input_el.focus();
        contact_edit_el.innerText = "Save";
      } else {
        contact_input_el.setAttribute("readonly", "readonly");
        contact_edit_el.innerText = "Edit";
        console.log("Save");
      }
    });

    contact_delete_el.addEventListener("click", () => {
      list_cont.removeChild(contact_el);
    });
  });
});

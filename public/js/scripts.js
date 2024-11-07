document.addEventListener("DOMContentLoaded", () => {
  fetch("/contacts")
    .then((response) => response.json())
    .then((data) => {
      const contactsDiv = document.getElementById("contacts");
      data.forEach((contact) => {
        const contactDiv = document.createElement("div");
        contactDiv.classList.add("contact");
        contactDiv.innerHTML = `
          <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
          <p><strong>Email:</strong> ${contact.email || "N/A"}</p>
          <p><strong>Age:</strong> ${contact.age}</p>
        `;
        contactsDiv.appendChild(contactDiv);
      });
    });
});

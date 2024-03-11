// const Contracts = require("../models/contracts")

// Connect to the database
// client.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });

// // Get the database named "contracts"
// const db = client.db("contracts");

// // Create a collection named "contact_forms"
// const collection = db.collection("contract_forms");

// Bind the submit event to the form
const form = document.querySelector(".contract-form");

// Get the input elements
const fullnameInput = document.getElementById("hospitalName");
const emailInput = document.getElementById("contractEmail");
const messageInput = document.getElementById("content");
const iconsContainer = document.querySelector(".icons-container");

// Get the icons
const icons = iconsContainer.querySelectorAll(".share-icon");

const contactBox = document.querySelector(".workik-contact-box");

// Get the phone, mail, and address elements
const phoneElement = contactBox.querySelector(".phone .contact-svg");
const mailElement = contactBox.querySelector(".mail .contact-svg");
const addressElement = contactBox.querySelector(".address .contact-svg");


// Get the submit button
const submitButton = document.getElementById("i634i-7");

// Add a click event listener to each icon
for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener("click", () => {
    // Open a new window with the corresponding social media website
    switch (icons[i].querySelector("img").src) {
      case "https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png":
        window.open("https://www.facebook.com/tgthinh21");
        break;
      case "https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png":
        window.open("https://facebook.com/an.unu2309/");
        break;
      case "https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png":
        window.open("https://www.facebook.com/lacthieuquan");
        break;
      case "https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png":
        window.open("https://instagram.com/_tg_an_/");
        break;
    }
  });
}

// submitButton.addEventListener("click", function() {
//   form.addEventListener("submit", (event) => {
//     // Prevent the form from submitting normally
//     event.preventDefault();

//     // Get the form data
//     const data = {
//       fullname: fullnameInput.value,
//       email: emailInput.value,
//       message: messageInput.value,
//     };

//     // Insert the form data into the database
//     collection.insertOne(data, (err, result) => {
//       if (err) {
//         console.log(err);
//         return;
//       }

//       console.log("Document inserted successfully:", result);

//       // Clear the form
//       form.reset();
//     });
//   });
// });


// Add a click event listener to the phone element
phoneElement.addEventListener("click", () => {
  // Open a new window with the phone number in it
  window.open("(028) 898 89899");
});

// Add a click event listener to the mail element
mailElement.addEventListener("click", () => {
  // Open a new window with the email address in it
  window.open("https://hcmus.edu.vn");
});

// Add a click event listener to the address element
addressElement.addEventListener("click", () => {
  // Open a new window with the address in it
  window.open("https://www.google.com/maps/place/University+of+Science+-+VNUHCM/@10.7628409,106.6799075,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f1c06f4e1dd:0x43900f1d4539a3d!8m2!3d10.7628356!4d106.6824824!16s%2Fm%2F02r129r?entry=ttu");
});
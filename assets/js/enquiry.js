async function sendEnquiry(event) {
  event.preventDefault();

  console.log("Form submission prevented");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Validation check
  if (name == "" || email == "" || phone == "" || phone.length != 10) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const data = {
    full_name: name,
    email: email,
    phone: phone,
    message: message,
  };

  try {
    console.log("Sending data:", data);

    const response = await fetch("https://admin.shakti-group.com/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Form submitted successfully");

      // Clear the form fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";

      // Show the thank you modal
      const modal = new bootstrap.Modal(document.getElementById("thankyou"));
      modal.show();
    } else {
      // Log server response for debugging
      console.error("Server error:", response.status, response.statusText);
    }
    return;
  } catch (error) {
    // Detailed error handling to capture specific error cases
    console.error("Error submitting the form:", error);
    alert("An error occurred. Please check your network and try again later.");
  }
}

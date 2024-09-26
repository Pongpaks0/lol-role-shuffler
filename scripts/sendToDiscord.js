export function sendToDiscord(url, blob) {
  // Create FormData
  const formData = new FormData();

  formData.append("files[0]", blob, "image.png");

  // Send the request
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Image sent successfully!");
      } else {
        console.error("Failed to send image:", response.statusText);
      }
    })
    .catch((error) => console.error("Error:", error));
}

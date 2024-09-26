// Function to convert base64 data URL to Blob
export function dataUrlToBlob(dataUrl) {
  const byteString = atob(dataUrl.split(",")[1]); // Decode base64 string
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0]; // Get MIME type

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

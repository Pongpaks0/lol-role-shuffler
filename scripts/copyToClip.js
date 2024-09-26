export async function copyToClipboard(imgData) {
  try {
    const blob = await fetch(imgData).then((res) => res.blob());
    const clipboardItem = new ClipboardItem({ [blob.type]: blob });
    await navigator.clipboard.write([clipboardItem]);
    //   alert('Table image copied to clipboard!');
  } catch (err) {
    console.error("Failed to copy image to clipboard", err);
  }
}

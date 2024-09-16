const ROLES = ["Top", "Jg", "Mid", "Carry", "Sup"];
const GAMES = ["Game1", "Game2", "Game3", "Game4", "Game5"];

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const name4 = document.getElementById("name4");
const name5 = document.getElementById("name5");
const webhookURL = document.getElementById("webhookURL");

document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let fillCount = 0;

    const input = [
      name1.value,
      name2.value,
      name3.value,
      name4.value,
      name5.value,
    ];

    const filtered = input.map(function (ele) {
      if (ele == "") {
        return `Autofill_${fillCount++}`;
      } else return ele;
    });

    const hasDuplicates = new Set(filtered).size !== filtered.length;

    if (hasDuplicates) {
      alert("Name not unique");
      return;
    }

    const matrix = generateUniqueMatrix(filtered);

    const matrixWithHead = addHeadersToMatrix(matrix, GAMES, ROLES);

    display2DArray(matrixWithHead);

    const output = document.getElementById("output-table");

    htmlToImage
      .toPng(output)
      .then(function (dataUrl) {
        if (webhookURL.value) {
          const blob = dataUrlToBlob(dataUrl);
          sendToDiscord(webhookURL.value, blob);
        } else {
          copyToClipboard(dataUrl);
        }
      })
      .catch(function (error) {
        console.error("Error generating image:", error);
      });

    localStorage.setItem("rememberedNames", input.toString());
    localStorage.setItem("rememberedHook", webhookURL.value);
  });

// Check if data exists in local storage
window.onload = function () {
  const rememberedNames = localStorage.getItem("rememberedNames").split(",");
  const rememberedHook = localStorage.getItem("rememberedHook");

  if (rememberedNames) {
    name1.value = rememberedNames[0];
    name2.value = rememberedNames[1];
    name3.value = rememberedNames[2];
    name4.value = rememberedNames[3];
    name5.value = rememberedNames[4];
  }

  if (rememberedHook) {
    webhookURL.value = rememberedHook;
  }
};

function generateUniqueMatrix(input) {
  const size = input.length;
  const matrix = [];

  for (let i = 0; i < size; i++) {
    let row = [...input]; // Copy the input numbers
    shuffle(row); // Shuffle the row to randomize the order

    while (
      matrix.some((r) =>
        r.some((_, col) => row[col] === matrix[matrix.indexOf(r)][col])
      )
    ) {
      shuffle(row); // Reshuffle if there's a column conflict with previous rows
    }
    matrix.push(row);
  }

  return matrix;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

function display2DArray(array) {
  document.getElementById("output").replaceChildren(); //reset

  const h2Element = document.createElement("h2");
  const pElement = document.createElement("p");
  const table = document.createElement("table");

  table.setAttribute("id", "output-table");
  h2Element.textContent = "Output";
  h2Element.setAttribute("id", "output-title");
  pElement.textContent = "Copied image to clipboard";
  pElement.setAttribute("id", "output-copied");

  // Iterate over rows
  array.forEach((row) => {
    const tr = document.createElement("tr");

    // Iterate over columns
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });

  // Append the table to the container div
  document.getElementById("output").appendChild(h2Element);
  document.getElementById("output").appendChild(table);
  document.getElementById("output").appendChild(pElement);
}

function addHeadersToMatrix(matrix, rowHeaders, colHeaders) {
  // Clone colHeaders and prepend an empty string for the top-left corner
  const newColHeaders = ["", ...colHeaders];

  // Add row headers to each row in the matrix
  const matrixWithHeaders = matrix.map((row, i) => [rowHeaders[i], ...row]);

  // Add the column headers as the first row
  matrixWithHeaders.unshift(newColHeaders);

  return matrixWithHeaders;
}

async function copyToClipboard(imgData) {
  try {
    const blob = await fetch(imgData).then((res) => res.blob());
    const clipboardItem = new ClipboardItem({ [blob.type]: blob });
    await navigator.clipboard.write([clipboardItem]);
    //   alert('Table image copied to clipboard!');
  } catch (err) {
    console.error("Failed to copy image to clipboard", err);
  }
}

// Function to convert base64 data URL to Blob
function dataUrlToBlob(dataUrl) {
  const byteString = atob(dataUrl.split(",")[1]); // Decode base64 string
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0]; // Get MIME type

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

function sendToDiscord(url, blob) {
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

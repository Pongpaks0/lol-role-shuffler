import { getDayColor } from "./getDayColor.js";
import { genNameColorPair } from "./genNameColorPair.js";

export function display2DArray(array, names) {
  const nameColor = genNameColorPair(names);
  document.getElementById("output").replaceChildren(); //reset

  const h2Element = document.createElement("h2");
  const pElement = document.createElement("p");
  const table = document.createElement("table");

  table.setAttribute("id", "output-table");
  table.style.backgroundColor = getDayColor();
  h2Element.textContent = "Output";
  h2Element.setAttribute("id", "output-title");
  pElement.textContent = "Copied image to clipboard";
  pElement.setAttribute("id", "output-copied");

  // Iterate over rows
  array.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");

    // Iterate over columns
    row.forEach((cell, colIndex) => {
      let cellElement;

      if (rowIndex === 0 || colIndex === 0) {
        // Create header cells for the first row and first column
        cellElement = document.createElement("th");
      } else {
        // Create regular data cells for other cells
        cellElement = document.createElement("td");
      }

      cellElement.textContent = cell;

      // Apply background color based on content
      cellElement.style.color = nameColor.get(cell);

      tr.appendChild(cellElement);
    });

    table.appendChild(tr);
  });

  // Append the table to the container div
  document.getElementById("output").appendChild(h2Element);
  document.getElementById("output").appendChild(table);
  document.getElementById("output").appendChild(pElement);
}

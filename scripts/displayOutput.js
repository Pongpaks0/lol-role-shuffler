import { getDayColor } from "./getDayColor.js";

export function display2DArray(array) {
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

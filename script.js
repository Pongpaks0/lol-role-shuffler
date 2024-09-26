import { generateUniqueMatrix } from "./scripts/genMatrix.js";
import { addHeadersToMatrix } from "./scripts/addMatrixHeader.js";
import { display2DArray } from "./scripts/displayOutput.js";
import { copyToClipboard } from "./scripts/copyToClip.js";
import { dataUrlToBlob } from "./scripts/htmlToImg.js";
import { sendToDiscord } from "./scripts/sendToDiscord.js";

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

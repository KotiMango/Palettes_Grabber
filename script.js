const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const exitPalette = () => {
  try {
    const exitButton = document.getElementsByClassName(
      "OneUp__closeButton___3dXkc"
    );
    exitButton[0].click();
  } catch (err) {
    console.log("Can't exit the page.");
    console.log(err);
  }
};

const getPaletteName = () => {
  const paletteTextObjLst = document.getElementsByClassName(
    "ImageAndInfoContainer__projectName___27FKf"
  );
  const paletteTextObj = paletteTextObjLst[0];
  return paletteTextObj.textContent;
};

const palettes = document.getElementsByClassName("Theme__theme___2NcED");
const paletteTitleAndSwatches = [];
for (let i = 0; i < 50; i++) {
  try {
    const palette = palettes[i];
    palette.click();
    const paletteName = getPaletteName();

    const paletteColors = [];
    for (const chldnde of palette.childNodes) {
      const backgroundInRgb = chldnde.style.background.split(" ").join("");
      const rgbVals = backgroundInRgb
        .substring(
          backgroundInRgb.indexOf("(") + 1,
          backgroundInRgb.indexOf(")")
        )
        .split(",");
      paletteColors.push(
        rgbToHex(
          parseInt(rgbVals[0]),
          parseInt(rgbVals[1]),
          parseInt(rgbVals[2])
        )
      );
    }
    paletteTitleAndSwatches.push({
      title: paletteName,
      swatches: paletteColors,
    });
  } catch (err) {
    console.log("Can't parse obj, err:");
    console.log(err);
  } finally {
    exitPalette();
  }
}

console.log(paletteTitleAndSwatches);

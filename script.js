const palettesGrabber = () => {
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
      console.table([[err], ["Can't exit palette"]]);
    }
  };
  const getPaletteName = () => {
    const paletteTextObjLst = document.getElementsByClassName(
      "ImageAndInfoContainer__projectName___27FKf"
    );
    return paletteTextObjLst[0].textContent;
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
          .split(",")
          .map(Number);
        paletteColors.push(
          rgbToHex(rgbVals[0], rgbVals[1], rgbVals[2]).toUpperCase()
        );
      }
      paletteTitleAndSwatches.push({
        title: paletteName,
        swatches: paletteColors,
      });
    } catch (err) {
      console.table([[err], ["Can't parse obj"]]);
    } finally {
      exitPalette();
    }
  }
  console.info(JSON.stringify(paletteTitleAndSwatches, null, " "));
};

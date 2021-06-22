const palettesGrabber = () => {
  (function (console) {
    console.save = function (data, filename) {
      if (!data) {
        console.error("Console.save: No data");
        return;
      }
      if (!filename) filename = "console.json";
      if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4);
      }
      var blob = new Blob([data], { type: "text/json" }),
        e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    };
  })(console);
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
  console.save(paletteTitleAndSwatches, ["colors.json"]);
};

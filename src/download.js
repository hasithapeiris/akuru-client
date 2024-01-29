export const downloadFont = (fontFile, fontName, onComplete) => {
  const link = document.createElement("a");
  link.href = fontFile;
  link.download = `${fontName.replace(/\s+/g, "-")}.ttf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // loader
  if (onComplete) {
    onComplete();
  }
};

export const downloadFontPack = (blob, filename, onComplete) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // loader
  if (onComplete) {
    onComplete();
  }
};

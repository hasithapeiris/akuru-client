import unicodeToDlManel from "./unicodeToDlManel";
import singlishToUnicode from "./singlishToUnicode";

function unicodeConverter(text) {
  const value = text;
  const newSinhalaText = singlishToUnicode(value);
  const newUnicodeText = unicodeToDlManel(newSinhalaText);

  return newUnicodeText;
}

export default unicodeConverter;

import dlManelToUnicode from "./dlManelToUnicode";
import unicodeToDlManel from "./unicodeToDlManel";

function wijesekaraConverter(text) {
  const value = text;
  const newSinhalaText = dlManelToUnicode(value);
  const newWijesekaraText = unicodeToDlManel(newSinhalaText);

  return newWijesekaraText;
}

export default wijesekaraConverter;

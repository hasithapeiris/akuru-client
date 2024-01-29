import { useState } from "react";
import styles from "./paragraph.module.css";

function Paragraph({ fontFamily, fontType }) {
  const [fontSize, setFontSize] = useState(20);
  const [fontWeight, setFontWeight] = useState("");

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value, 10));
  };

  const handleFontWeightChange = (event) => {
    setFontWeight(event.target.value);
  };

  return (
    <div className={styles.paragraph}>
      <div className={styles.paraContainer}>
        <select
          className={styles.selector}
          id="fontSizeSelector"
          value={fontSize}
          onChange={handleFontSizeChange}
        >
          <option value={12}>12px</option>
          <option value={16}>16px</option>
          <option value={20}>20px</option>
          <option value={24}>24px</option>
          <option value={28}>28px</option>
          <option value={32}>32px</option>
        </select>

        <select
          className={styles.selector}
          id="fontWeightSelector"
          value={fontWeight}
          onChange={handleFontWeightChange}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>

        {fontType === "unicode" ? (
          <div className={styles.para}>
            <p
              style={{
                fontFamily: `${fontFamily}`,
                fontSize: `${fontSize}px`,
                fontWeight,
              }}
            >
              isxy, NdIdj hkq f,dalfha we;s w,xldru NdIdjka w;=ßka tlls' tfukau
              f,dalfha w,xldru wl=re w;r isxy, wl=re y;rjk ia:dkh ,ndf.k we;'
              wfkl=;a NdIdjkag idfmalaIj bf.kSug ;rula wmyiq neúka isxy, NdIdj
              Ndú;dlrkafka b;du iqÆ msßila jqj;a fuh b;du;a jákd NdIdjls' isxy,
              NdIdj f,dalfha m%p,s; lsÍug wka;¾cd,fha isxy, wl=re Ndú;h b;du
              jeo.;a fõ' Tnf.a fjí wjä ks¾udK fyda wfkl=;a ks¾udK i|yd isxy,
              wl=re o Ndú;d lsÍug fhduqjkak'
            </p>
          </div>
        ) : (
          <div className={styles.para}>
            <p
              style={{
                fontFamily: `${fontFamily}`,
                fontSize: `${fontSize}px`,
                fontWeight,
              }}
            >
              සිංහල භාෂාව යනු ලෝකයේ ඇති අලංකාරම භාෂාවන් අතුරින් එකකි. එමෙන්ම
              ලෝකයේ අලංකාරම අකුරු අතර සිංහල අකුරු හතරවන ස්ථානය ලබාගෙන ඇත.
              අනෙකුත් භාෂාවන්ට සාපේක්ෂව ඉගෙනීමට තරමක් අපහසු බැවින් සිංහල භාෂාව
              භාවිතාකරන්නේ ඉතාම සුලු පිරිසක් වුවත් මෙය ඉතාමත් වටිනා භාෂාවකි.
              සිංහල භාෂාව ලෝකයේ ප්‍රචලිත කිරීමට අන්තර්ජාලයේ සිංහල අකුරු භාවිතය
              ඉතාම වැදගත් වේ. ඔබගේ වෙබ් අවඩි නිර්මාණ හෝ අනෙකුත් නිර්මාණ සඳහා
              සිංහල අකුරු ද භාවිතා කිරීමට යොමුවන්න.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Paragraph;

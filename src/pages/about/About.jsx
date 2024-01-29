import React from "react";
import styles from "./about.module.css";
import FeaturedImage from "./akuru-kathawa.svg";

function About() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.featuredImageSection}>
        <img
          className={styles.featuredImage}
          src={FeaturedImage}
          alt="[Alt text for the featured image]"
        />
      </section>
      <section className={styles.aboutSection}>
        <p className={styles.para}>
          මම ග්‍රැෆික් ඩිසයින් පටන් ගත්ත කාලේ තිබ්බ ලොකු ප්‍රශ්නයක් තමයි සිංහල
          අකුරුත් එක්ක වැඩකරන එක. එහෙම වෙන්න හේතු කිහිපයක්ම තිබුනා. පළවෙනි හේතුව
          තමයි සිංහල අකුරු unicode වලින් ඩිසයින් කරලා තිබීම. ඒක නිසා
          illustrator, photoshop වගේ softwares වල සිංහල අකුරු ටයිප් කරද්දි
          unicode දැනගෙන ඉන්න වුනා. හැබැයි මම ඒකට විසඳුමක් හොයද්දි online සිංහල
          unicode converters කිහිපයක්ම හොයාගන්න පුළුවන් වුන නිසා ඒ ප්‍රශ්නෙ
          යම්තාක් දුරකට විසඳුනා.
          <br />
          <br />
          දෙවෙනි ප්‍රශ්නෙ තමයි අපේ projects වලට හරියටම සෙට් වෙන සිංහල අකුරු
          හොයාගන්න එක. Internet එකේ තැන් තැන් වලින් අකුරු හොයාගන්න පුළුවන් උනත්,
          අපි අකුරු download කරන්න කලින් test කරන්න පුළුවන් තැනක් හොයාගන්න
          බැරිවුනා. ඔයාලා දැකලා ඇති Google Fonts සහ Font Space වගේ වෙබ් අඩවි වල
          අපිට කැමති දෙයක් ටයිප් කරලා font එක test කරලා බලන්න පුළුවන් වගේම අදාළ
          fonts වල background information එහෙමත් හොඳට බලාගන්න පුළුවන්.
          <br />
          <br />
          ඉතින් සිංහල අකුරුත් එක්ක වැඩ කරද්දි මට ආපු මේ ප්‍රධාන ප්‍රශ්න දෙකට
          විසඳුමක් විදිහට තමයි අකුරු වෙබ් අඩවිය හදන්න තීරණය කලේ. කලින් කිව්වා
          වගේ සිංහල unicode අකුරු convert කරගන්න එක වගේම, අකුරු test කරලම
          download කරගන්න එක එකම තැනකින් කරගන්න ඔයාලට දැන් අවස්ථාව ලැබිලා
          තියෙනවා. මීට අමතරව අකුරු packs විදිහටත් download කරගන්න පුළුවන්.
          අවශ්‍ය වැඩේ විතරක් කරගන්න පුළුවන් වෙන විදිහට user interface එකත්
          simple විදිහට design කරලා තියෙනවා. මේකට තවත් filter options කිහිපයක්ම
          ඉදිරියේදී එකතු කරන්න බලාපොරොත්තු වෙනවා. දැනට මේක use කරද්දි ඔයාලට එන
          ගැටලු අනිවාර්යෙන්ම මට කියන්න. අදාළ විස්තර contact page එකෙන් බලාගන්න
          පුළුවන්.
        </p>
      </section>
    </div>
  );
}

export default About;

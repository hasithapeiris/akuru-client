import Styles from "./symbols.module.css";

function Symbols({ fontFamily }) {
  return (
    <div className={Styles.symbols}>
      <div className={Styles.table}>
        <table style={{ fontFamily: `${fontFamily}` }}>
          <tr>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Symbols;

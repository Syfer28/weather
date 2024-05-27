import React, { useState } from "react";
import styles from "./styles/App.module.css";
import Map from "./component/Map";
import Weather from "./component/Weather";

function App() {
  const [coord, setCoord] = useState({});
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Map setCoord={setCoord} />
        <Weather coord={coord} />
      </div>
    </div>
  );
}

export default App;

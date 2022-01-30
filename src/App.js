import Header from "./components/header/Header";
import classes from "./App.module.css";
import Main from "./components/main/Main";
import { useState } from "react";
import Footer from "../src/components/footer/Footer";

function App() {
  const [showMain, setShowMain] = useState(false);

  const showMainHandler = () => {
    setShowMain(true);
  };

  const showFirstPageHandler = () => {
    setShowMain(false);
  };

  return (
    <main className={classes.main}>
      <Header
        showMain={showMain}
        showMainHandler={showMainHandler}
        showFirstPageHandler={showFirstPageHandler}
      />

      {showMain && <Main />}
      <Footer />
    </main>
  );
}

export default App;

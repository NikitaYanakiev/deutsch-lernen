import React from "react";
import "./DictionaryPage.scss";

import Navbar from "../../components/sections/navbar/navbar";
import Header from "../../components/sections/header/header";
import SetList from "../../components/common/dictionary/SetList";

const DictionaryPage = () => {
  return (
    <section className="dictionary">
      <Header />
      <div className="dictionary__content">
        <SetList />
      </div>
      <Navbar />
    </section>
  );
};

export default DictionaryPage;

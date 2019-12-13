import React from "react";
import PropTypes from "prop-types";
import style from "./style.module.css";

const App = ({ children }) => (
  <div>
    <main className={style.content}>{children}</main>
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;

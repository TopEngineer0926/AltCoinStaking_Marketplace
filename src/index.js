import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import MyCollections from "./pages/MyCollections";

//dapp
import { DAppProvider } from "@usedapp/core";
import NFTDetail from "./pages/NFTDetail";
import "antd/dist/antd.css";
import "./styles/css/feather.css";
import "./styles/css/_copyright.scss";
import MainFooter from '../src/components/MainFooter';

ReactDOM.render(
  <Router>
      <Routes>
        <Route path="/" element={<DAppProvider config={{}}><Home /></DAppProvider>} />
        <Route path="/create" element={<DAppProvider><Create /></DAppProvider>} />
        <Route path="/explore" element={<DAppProvider config={{}}><Explore /></DAppProvider>} />
        <Route path="/explore" element={<DAppProvider config={{}}><Explore /></DAppProvider>} />
        <Route path="/my-collections" element={<DAppProvider config={{}}><MyCollections /></DAppProvider>} />
        <Route path="/detail" element={<DAppProvider config={{}}><NFTDetail /></DAppProvider>} />

      </Routes>
      <MainFooter />

    </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React, { useState, useEffect, createRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaEthereum } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { hotDropsData } from "../constants/MockupData";
import NFTCard from "../components/NFTCard";
import { useARStatus } from "../hooks/isARStatus";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const NFTDetail = () => {
  const isMobile = useMobile();

  const [colors, setColors] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    setColors([]);
  }, [state]);

  const isARSupport = useARStatus(state.item.src);

  //!! aciklama karakter sayisi sinirlanmali.
  //!! scroll sorununa cozum bulunmali.

  return (
    <div>
      <Header />
      <div id="nft-detail-card-wrapper">
        <Card
          width={isMobile ? "100%" : "65vw"}
          height={isMobile ? "700px" : "60vh"}
          blurColor={colors[0]}
          child={
            //Detail Content
            <div id="detail-content">
              {isARSupport ? (
                <model-viewer
                  ar-scale="auto"
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  id="arDetail"
                  loading="eager"
                  camera-controls
                  auto-rotate
                  src={state.item.src}
                >
                </model-viewer>
              ) : (
                <>
                  <ColorExtractor getColors={getColors}>
                    <img id="detail-image" src={state.item.src} />
                  </ColorExtractor>
                </>
              )}

              <Grid container direction="column">
                <Grid item>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: {
                        width: 0,
                      },
                    }}
                  >
                    <Tab label="History" {...a11yProps(0)} disableRipple />
                    <Tab label="Details" {...a11yProps(1)} disableRipple />
                  </Tabs>
                </Grid>
                <Grid item>
                  <TabPanel value={value} index={0}>
                    <div>sdf</div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div id="detail-info">
                      <div id="detail-info-container">
                        <p id="collection"> Level : {state.item.level} </p>
                        <p id="name"> Name : {state.item.name} </p>
                        <p id="description">
                          Owned by :
                          <a href={process.env.REACT_APP_POLYGONSCAN_URL + "/address/" + state.item.owner} target="_blank">
                            {state.item.owner.slice(0, 7) + "..." + state.item.owner.slice(35, 42)}
                            {/* {state.item.owner} */}
                          </a>
                        </p>
                        <p id="description"> {state.item.description} </p>
                      </div>

                      <div id="detail-controls">
                        {state.item.sellType == "sold" ? (
                          <p className="sold">Sold</p>
                        ) : state.item.sellType == "listed" ? (
                          <Button
                            width={isMobile ? "70%" : "70%"}
                            height="50px"
                            child={
                              <div id="button-child">
                                <FaEthereum size="28px" />
                                <p id="price">{state.item.price}</p>
                              </div>
                            }
                          ></Button>
                        ) : (
                          <Button
                            width={isMobile ? "70%" : "70%"}
                            height="50px"
                            child={
                              <div id="button-child">
                                <p id="price">List</p>
                              </div>
                            }
                          ></Button>
                        )}
                      </div>
                    </div>
                  </TabPanel>
                </Grid>
              </Grid>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default NFTDetail;

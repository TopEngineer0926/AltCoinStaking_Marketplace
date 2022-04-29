import React, { useState, useEffect, createRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { hotDropsData } from "../constants/MockupData";
import NFTCard from "../components/NFTCard";
import { useARStatus } from "../hooks/isARStatus";



const NFTDetail = () => {
  const isMobile = useMobile();

  const [colors, setColors] = useState([]);

  const [isLike, setIsLike] = useState(false);
  
  

  const like = () => setIsLike(!isLike);

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
                  {" "}
                </model-viewer>
              ) : (
                <>
                  {" "}
                  <ColorExtractor getColors={getColors}>
                    <img id="detail-image" src={state.item.src} />
                  </ColorExtractor>
                </>
              )}

              <div id="detail-info" style={{}}>
                <div id="detail-info-container">
                  <p id="collection"> Level : {state.item.level} </p>
                  <p id="name"> Name : {state.item.name} </p>
                  <p id="description"> Owned by : {state.item.owner.slice(0,5) + "..." + state.item.owner.slice(38,42)} </p>
                  <p id="description"> {state.item.description} </p>
                </div>

                <div id="detail-controls">
                  {
                    state.item.sellType == "sold" ?
                      <p className="sold">Sold</p>
                    : state.item.sellType == "listed" ?
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
                    :
                      <Button
                        width={isMobile ? "70%" : "70%"}
                        height="50px"
                        child={
                          <div id="button-child">
                            <p id="price">List</p>
                          </div>
                        }
                      ></Button>
                  }

                  <div className="like-container">
                    <button className="like" onClick={like}>
                      {!isLike ? (
                        <AiOutlineHeart size="45" color="white" />
                      ) : (
                        <AiFillHeart
                          size="45"
                          style={{
                            stroke: "-webkit-linear-gradient(to bottom, #38ef7d, #11998e)"
                          }}
                          color="#00f5c966"
                        />
                      )}
                    </button>
                    <p className="like-count">{state.item.vote}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default NFTDetail;

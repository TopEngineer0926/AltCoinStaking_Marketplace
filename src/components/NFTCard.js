import React, { useEffect, useState } from "react";
import "../styles/NFTCard.css";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ColorExtractor } from 'react-color-extractor'
import Card from "./base/Card";
import Button from "./base/Button";
import { Colors } from "../constants/Colors";


import { ModelViewerElement } from "@google/model-viewer";
import { useARStatus } from "../hooks/isARStatus";



const NFTCard = ({
  username,
  nftName,
  level, 
  price,
  sellType,
  nftSrc,
  likeCount,
  gradient,
  onClick,
}) => {
  const [isLike, setIsLike] = useState(false);
  const [colors, setColors] = useState([]);

  const isARSupport = useARStatus(nftSrc);

  useEffect(() => {
    console.log(isARSupport);
  }, []);

  const like = () => setIsLike(!isLike);

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
    //console.log(colors);
  };

  return (
    <Card
      blurColor={colors[0]}
      child={
        <>
          {isARSupport ? (
            <model-viewer
              ar-scale="auto"
              ar
              ar-modes="webxr scene-viewer quick-look"
              id="reveal"
              loading="eager"
              camera-controls
              auto-rotate
              src={nftSrc}
            >
              {" "}
            </model-viewer>
          ) : (
            <>
              <ColorExtractor getColors={getColors}>
                <img className="nft-image" src={nftSrc} />
              </ColorExtractor>
            </>
          )}
          <div className="wrapper">
            <div className="info-container">
              <p className="owner">{level}</p>
              <p className="name">
                {username.slice(0, 5) + "..." + username.slice(38, 42)}
              </p>
              <p className="name">{nftName}</p>
            </div>

            <div className="price-container">
              {
                sellType == 'sold' ?
                  <>
                    <p className="sold-label">Sell Type</p>
                    <p className="sold">Sold</p>
                  </>
                : sellType == 'listed' ?
                  <>
                    <p className="price-label">Price</p>
                    <p className="price">
                      <FaEthereum /> {price}
                    </p>
                  </>
                : <></>
              }

            </div>
          </div>
          <div className="buttons">
            {/* <button className="buy-now">Buy Now</button> */}
            {
              sellType == "sold" ?
                <Button
                  color={Colors.buttons.primary}
                  textContent="Details"
                  onClick={onClick}
                />
              : sellType == "listed" ?
                <Button
                  color={Colors.buttons.primary}
                  textContent="Buy Now"
                  onClick={onClick}
                />
              :
                <Button
                  color={Colors.buttons.primary}
                  textContent="List"
                  onClick={onClick}
                />
            }

            <div className="like-container">
              <button className="like" onClick={like}>
                {!isLike ? (
                  <AiOutlineHeart size="30" color="white" />
                ) : (
                  <AiFillHeart
                    size="30"
                    style={{
                      stroke: "-webkit-linear-gradient(to bottom, #38ef7d, #11998e)"
                    }}
                    color="#00f5c966"
                  />
                )}
              </button>
              <p className="like-count">{likeCount}</p>
            </div>
          </div>
        </>
      }
    ></Card>
  );
};

export default NFTCard;


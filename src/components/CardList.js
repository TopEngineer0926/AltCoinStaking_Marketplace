import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";

const CardList = ({ list, type = "horizontal" }) => {
  let navigate = useNavigate();

  return (
    <div
      id="card-list"
      style={{ flexDirection: type == "horizontal" ? "row" : "column" }}
    >
      {list.map((item, index) => (
        <NFTCard
          nftSrc={item.src}
          price={item.price}
          level={item.level}
          username={item.owner}
          nftName={item.name}
          likeCount = {item.vote}
          sellType={item.sellType}
          key={index}
          onClick={() => navigate("/detail", { state: { item: item } })}
        />
      ))}
    </div>
  );
};

export default CardList;

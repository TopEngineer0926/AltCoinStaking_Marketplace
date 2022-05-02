import React, { useState } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import Account from "./Account";

const MobileDrawer = () => {
  const [toggle, setToggle] = useState(false);

  // Toggle drawer
  const toggleHandler = () => {
    setToggle((prev) => !prev);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {!toggle ? (
        <MenuOutlined className="mDrawerHandler" onClick={toggleHandler} />
      ) : (
        <CloseOutlined className="mDrawerHandler" onClick={toggleHandler} />
      )}
      {toggle && (
        <Menu
          className="mDrawerMenu"
          defaultSelectedKeys={["nftMarket"]}
          mode="vertical"
        >
          <Menu.Item key="nftMarket">
            <NavLink to="/" onClick={toggleHandler}>
              🛒 Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="nft">
            <NavLink to="/explore" onClick={toggleHandler}>
              🖼 Explore
            </NavLink>
          </Menu.Item>
          <Menu.Item key="create">
            <NavLink to="/my-collections" onClick={toggleHandler}>
              📑 My Collections
            </NavLink>
          </Menu.Item>
          <Menu.Item key="create">
            {/* <NavLink to="/my-collections" onClick={toggleHandler}> */}
              <Account />
            {/* </NavLink> */}
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default MobileDrawer;

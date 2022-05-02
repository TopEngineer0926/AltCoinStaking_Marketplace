import react, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEthers, useEtherBalance } from "@usedapp/core";
import '../styles/Header.css';
import Account from "./Account";
import MobileDrawer from "./mobileDrawer";

const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      console.log("===== window.innerWidth:", window.innerWidth);
      const mobiled = window.innerWidth > 700 ? false : true;
      setIsMobile(mobiled);
    }, [window.innerWidth]);
    // const {activateBrowserWallet, account} = useEthers();
    // const etherBalance = useEtherBalance(account);

    // console.log("etherBalance", parseFloat(parseInt(etherBalance) / Math.pow(10, 18)).toFixed(3));
    const handleWallet = () => {
      // activateBrowserWallet();

    }

    return (
      <div id="header">
        <Link to='/'>
          <img src="/logo.png"  id='logo'/>
        </Link>
        {
          isMobile ?
            <MobileDrawer />
          :
            <div id="link-containers">
              <a href="/">Home</a>
              <a href="/explore">Explore</a>
              <a href="/my-collections">My collections</a>

              {/* <button id="connect-wallet" onClick={handleWallet} >{!account ? 'Connect Wallet' : account}</button> */}
              <Account />
            </div>
        }
      </div>
    );
}

export default Header;
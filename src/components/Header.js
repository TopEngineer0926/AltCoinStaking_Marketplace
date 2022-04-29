import react, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEthers, useEtherBalance } from "@usedapp/core";

const Header = () => {

    const {activateBrowserWallet, account} = useEthers();
    const etherBalance = useEtherBalance(account);

    console.log("etherBalance", parseFloat(parseInt(etherBalance) / Math.pow(10, 18)).toFixed(3));
    const handleWallet = () => {
      activateBrowserWallet();

    }

    return (
        <div id="header">
        <Link to='/' id='logo'>
          <img src="/logo-white.png" width={350}/>
        </Link>

        <div id="link-containers">
          <a href="/explore">Explore</a>
          <a href="/my-collections">My collections</a>

          <button id="connect-wallet" onClick={handleWallet} >{!account ? 'Connect Wallet' : account}</button>
        </div>
      </div>
    );
}

export default Header;
import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { getEllipsisTxt } from "../helpers/formatters";
import Blockie from "./Blockie";
import { Steps, Button, Card, Modal, message, Spin, Row, Col } from "antd";
import Address from "./Address/Address";
import { SelectOutlined, WalletOutlined } from "@ant-design/icons";
import { getExplorer } from "../helpers/networks";
// import Web3 from "web3";

const { Step } = Steps;

const steps = [
  {
    title: "Switch Network",
    content: "Switch Polygon Network!",
  },
  {
    title: "Connect Wallet",
    content: "Connect your wallet!",
  },
];

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
};

function Account() {
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
  const [chainning, setChainning] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const getCurrentStatus = () => {
    const _chained = chainId != process.env.REACT_APP_CHAIN_ID;
    const _cur = _chained ? 0 : 1;
    setCurrent(_cur);
    setChainning(_chained);
  };

  useEffect(() => {
    const mobiled = window.innerWidth > 700 ? false : true;
    setIsMobile(mobiled);
  }, [window.innerWidth]);

  const next = () => {
    setCurrent(current + 1);
  };

  async function switchNetwork(chain) {
    console.log("window.ethereum", window.ethereum);
    // if (window.ethereum) {
    //   await window.ethereum
    //     .request({
    //       method: "wallet_switchEthereumChain",
    //       params: [{ chainId: Web3.utils.toHex(chain) }],
    //     })
    //     .then((res) => {
    //       console.log("switch network success!");
    //       setChainning(false);
    //     })
    //     .catch((err) => {
    //       console.log("switch network error: ", err.message);
    //       setChainning(true);
    //     });
    // }
  }

  // if (!account || chainId != process.env.REACT_APP_CHAIN_ID) {
  return !account || chainId != process.env.REACT_APP_CHAIN_ID ? (
    <>
      {(
        <div
          style={styles.account}
          onClick={() => {
            getCurrentStatus();
            setIsModalVisible(true);
          }}
        >
          <p style={{ marginRight: "5px", ...styles.text }}>Authenticate</p>
          <Blockie currentWallet scale={3} />
        </div>
      )}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Authenticate
        <Row align="bottom">
          <Col span={12}>
            <Steps direction="vertical" current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
          <Col span={12} style={{ paddingLeft: "10px", paddingBottom: "15px" }}>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    switchNetwork(process.env.REACT_APP_CHAIN_ID);
                    next();
                  }}
                >
                  Switch Network
                </Button>
              )}
              {current === steps.length - 1 && (
                <Spin spinning={chainning}>
                  <Button
                    type="primary"
                    onClick={() => {
                      activateBrowserWallet();
                      setIsModalVisible(false);
                      message.success("Success Connection!");
                      setCurrent(0);
                    }}
                  >
                    Connect Wallet
                  </Button>
                </Spin>
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  ) : (
    <>
      {
        <div style={styles.account} onClick={() => setIsModalVisible(true)}>
          <p style={{ marginRight: "5px", ...styles.text }}>
            {getEllipsisTxt(account, 6)}
          </p>
          <Blockie currentWallet scale={3} />
        </div>
      }
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            deactivate();
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;

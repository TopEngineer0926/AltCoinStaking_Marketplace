import React, { useState, useEffect } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Typography,
  Layout,
  Divider,
  Row,
  Col,
  Button,
} from "antd";
import DiscordIcon from "./DiscordIcon";
import SocialWidget from "./SocialWidget";
import contactData from "../constants/contact.json";

const { Footer } = Layout;
const { Text, Title } = Typography;

const MainFooter = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  return (
    <ConfigProvider>
      <Footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#13131d",
          display: "flex",
          justifyContent: "center",
        }}
        className="copy-right-one"
      >
        <Col
          span={24}
          className="footerItems"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Row justify="space-between" md={12} sm={24} xs={24}>
            <Col style={{ display: "flex" }}>
              <Text
                style={{ color: "grey", alignItems: "center", margin: "auto" }}
              >
                &copy; {new Date().getFullYear()} Alt Coin Staking, Inc. All
                rights reserved
              </Text>
            </Col>
          </Row>
          <Row md={12} sm={24} xs={24}>
            <Col sm={24} md={24} lg={12} >
              <Row className="copyright-right">
                <SocialWidget socials={contactData.socials} />
              </Row>
            </Col>
          </Row>
        </Col>
      </Footer>
    </ConfigProvider>
  );
}
export default MainFooter;

const styles = {
  linkBtn: {
    marginTop: "8px",
    marginRight: "12px",
    borderRadius: "10px",
    ".svg": {
      width: "30px",
      height: "20px",
    },
  },
};

ConfigProvider.config({
  theme: {
    primaryColor: "#2081e2",
  },
});

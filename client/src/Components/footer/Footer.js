import {
  CopyrightOutlined,
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; 

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  const [date, setDate] = useState(null);
   useEffect(()=>{
    const dates = new Date().getFullYear();
    setDate(dates);

   }, [])
  return (
    <Container>
      <Left>
        <Logo><span className="logo_color">SHOP</span>PEE</Logo>
        <Desc>Shop quality At Best E-commerce Online Mixed Solution.</Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem><Link to='/' style={{color: "#111", fontWeight: 'normal', fontSize: '15px'}}>Home</Link></ListItem>
          <ListItem><Link to='/cart' style={{color: "#111", fontWeight: 'normal', fontSize: '15px'}}>Your Bag</Link></ListItem>
          <ListItem><Link to='/shop' style={{color: "#111", fontWeight: 'normal', fontSize: '15px'}}>Global Shop</Link></ListItem> 
          <ListItem><Link to='/terms' style={{color: "#111", fontWeight: 'normal', fontSize: '15px'}}>Terms</Link></ListItem>
          <ListItem><Link to='/profile' style={{color: "#111", fontWeight: 'normal', fontSize: '15px'}}>Update Profile</Link></ListItem>
          <ListItem><Link to='/' style={{color: "#111", fontWeight: 'normal', fontSize: '15px'}}>Become a seller</Link></ListItem>
          <ListItem><Link to='/orderhistory' style={{color: "#111", fontWeight: 'normal', fontSize: '15px'}}>Order History</Link></ListItem>
          
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 622 Center , Yaounde
          -Cameroon
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +237 698859688
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          beshopper@shop.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        <ContactItem style={{ marginTop: '20px' }}>
          <CopyrightOutlined style={{ marginRight: "10px"}} />
          {date} bestshopper@shoppee.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;

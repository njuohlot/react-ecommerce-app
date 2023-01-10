import styled from "styled-components"
import {mobile} from '../responsive'

const Container = styled.div`
height: 30px;
background: teal;
color: white;
justify-content: center;
align-items: center;
font-size: 14px;
font-wight: 500;
display: flex;
width: 100vw;
${mobile({ width: "103.5vw" })}
`

const Announcement = () => {
  return (
    <Container>
      Super Deal! Free Delivery on Orders Over $400
    </Container>
  )
}

export default Announcement
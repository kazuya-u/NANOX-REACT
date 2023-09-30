import MyApi from "../MyAPI/MyApi";
import MyNotifications from "../MyNotifications/MyNotifications";
import MyProfile from "../MyProfile/MyProfile";
import styled from "styled-components";

const Layout: React.FC = () => {
  return (
    <>
    <StyledContainer>
      <MyProfile />
      <StyledSpace />
      <StyledSpace />
      <MyApi />
      <StyledSpace />
      <StyledSpace />
      <MyNotifications />
    </StyledContainer>
    <StyledContainer>
    </StyledContainer>

    </>
  );
};

const StyledSpace = styled.div`
  display: flex; align-items: center; justify-content: center; pointer-events: none; width: 100%; height: 18px; flex: 0 0 auto;
`;

const StyledContainer = styled.div`
  flex-grow: 1;
  padding: 36px 60px;
  margin-right: 0px;
  margin-bottom: 0px;
`;

export default Layout;

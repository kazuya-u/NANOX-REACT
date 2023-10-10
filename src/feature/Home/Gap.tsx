import styled from "styled-components";

const Gap: React.FC = () => {
  return (
    <>
      <StyledWrapper_1>
        <StyledGap />
      </StyledWrapper_1>
    </>
  )
}

const StyledWrapper_1 = styled.div`
  position: relative;
  width: 46px;
  flex-grow: 0;
  flex-shrink: 0;
  transition: opacity 200ms ease-out 0s;
  opacity: 0;
`;

const StyledGap = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 21px;
  width: 4px;
  height: 100%;
  background: rgba(55, 53, 47, 0.16);
`;

export default Gap;

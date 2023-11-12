import { GoBold, GoTag, GoTools, GoWorkflow } from "react-icons/go";
import styled from "styled-components";

const ListHeader: React.FC = () => {

  return (
    <>
      <Styled>
        <StyledContainer>
          <StyledItem>
            <StyledItemWrapper>
              <StyledCell width="276px">
                <StyledItemInnerWrapper>
                  <StyledItemIcon>
                    <StyledItemIconWrapper>
                      <GoBold />
                    </StyledItemIconWrapper>
                  </StyledItemIcon>
                </StyledItemInnerWrapper>
              </StyledCell>
            </StyledItemWrapper>
          </StyledItem>
          <StyledItem>
            <StyledItemWrapper>
              <StyledCell width="112px">
                <StyledItemInnerWrapper>
                  <StyledItemIcon>
                    <StyledItemIconWrapper>
                      <GoTools />
                    </StyledItemIconWrapper>
                    <StyledItemText>
                      Project
                    </StyledItemText>
                  </StyledItemIcon>
                </StyledItemInnerWrapper>
              </StyledCell>
            </StyledItemWrapper>
          </StyledItem>
          <StyledItem>
            <StyledItemWrapper>
              <StyledCell width="175px">
                <StyledItemInnerWrapper>
                  <StyledItemIcon>
                    <StyledItemIconWrapper>
                      <GoTag />
                    </StyledItemIconWrapper>
                    <StyledItemText>
                      Tag
                    </StyledItemText>
                  </StyledItemIcon>
                </StyledItemInnerWrapper>
              </StyledCell>
            </StyledItemWrapper>
          </StyledItem>
          <StyledItem>
            <StyledItemWrapper>
              <StyledCell width="112px">
                <StyledItemInnerWrapper>
                  <StyledItemIcon>
                    <StyledItemIconWrapper>
                      <GoWorkflow />
                    </StyledItemIconWrapper>
                    <StyledItemText>
                      Status
                    </StyledItemText>
                  </StyledItemIcon>
                </StyledItemInnerWrapper>
              </StyledCell>
            </StyledItemWrapper>
          </StyledItem>
        </StyledContainer>

      </Styled>
    </>
  )
}

const Styled = styled.div`
  display: flex;
  position: absolute;
  background: white;
  z-index: 86;
  height: 33px;
  color: rgba(55, 53, 47, 0.65);
  box-shadow: white -3px 0px 0px, rgb(233, 233, 231) 0px 1px 0px;
  min-width: calc((100% - 192px) - 0px);
  left: 0px;
  right: 0px;
`;
const StyledContainer = styled.div`
  display: inline-flex;
  margin: 0px;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledItemWrapper = styled.div`
  display: flex;
  position: relative;
`;

const StyledCell = styled.div<{ width: string; }>`
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
  font-size: 14px;
  padding: 0px;
  width: ${(props) => (props.width ? props.width : "auto")};
`;
const StyledItemInnerWrapper = styled.div`
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
`;

const StyledItemIcon = styled.div`
  display: flex;
  align-items: center;
  line-height: 120%;
  min-width: 0px;
  font-size: 14px
`;

const StyledItemIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
`;

const StyledItemText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ListHeader;

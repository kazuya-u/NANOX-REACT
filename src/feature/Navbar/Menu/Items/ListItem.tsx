import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface MenuItemProps {
  icon: IconType;
  text: string;
  link: string;
}

export const ListItem: React.FC<MenuItemProps> = ({ icon: Icon, text, link }) => {
  return (
    <>
      <li>
        <StyledLink to={link}>
          <StyledLinkInner>
            <StyledSpace>
              <StyledSpaceInner />
            </StyledSpace>
            <StyledIcon>
              <StyledIconContainer>
                <StyledIconInner>
                  <StyledIconInnerWrapper>
                    <Icon size={16} />
                  </StyledIconInnerWrapper>
                </StyledIconInner>
              </StyledIconContainer>
            </StyledIcon>
            <StyledLinkText>
              <StyledLinkTextWrapper>
                {text}
              </StyledLinkTextWrapper>
            </StyledLinkText>
          </StyledLinkInner>
        </StyledLink>
      </li>
    </>
  );
};

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  width: calc(100% - 8px);
  border-radius: 3px;
  margin-left: 4px;
  margin-right: 4px;
  :hover {
    display: block;
    color: inherit;
    text-decoration: none;
    transition: background 20ms ease-in 0s;
    cursor: pointer;
    width: calc(100% - 8px);
    border-radius: 3px;
    margin-left: 4px;
    margin-right: 4px;
    background: rgba(55, 53, 47, 0.08);
    box-shadow: rgba(35, 131, 226, 0.57) 0px 0px 0px 1px inset, rgba(35, 131, 226, 0.35) 0px 0px 0px 2px;
  }
`;

const StyledLinkInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  min-height: 27px;
  padding: 2px 10px 2px 5px;
  margin-top: 1px;
  margin-bottom: 1px;
  border-radius: 3px;
`;

const StyledSpace = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 3px;
  color: rgba(55, 53, 47, 0.65);
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0px;
`;

const StyledSpaceInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 0;
  width: 22px;
  height: 18px;
  margin-left: -3px;
  margin-right: 4px;
  position: relative;
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 0;
  width: 22px;
  height: 18px;
  margin-left: -3px;
  margin-right: 4px;
  position: relative;
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border-radius: 0.25em;
  flex-shrink: 0;
`;

const StyledIconInner = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
`;

const StyledIconInnerWrapper = styled.div`
height: 16px;
  width: 16px;
  font-size: 16px;
  line-height: 1;
  margin-left: 0px;
  color: black;
`;


const StyledLinkText = styled.div`
  flex: 1 1 auto;
  white-space: nowrap;
  min-width: 0px;
  overflow: hidden;
  text-overflow: clip;
  display: flex;
  align-items: center;
`

const StyledLinkTextWrapper = styled.div`
white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

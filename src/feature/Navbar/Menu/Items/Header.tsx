import styled from "styled-components"

export default function Header() {
  return (
    <StyledHeader>
      <StyledContainer>
        <StyledInner>
          <StyledInnerWrapper>
            メニュー
          </StyledInnerWrapper>
        </StyledInner>
      </StyledContainer>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  flex: 1 1 auto;
  white-space: nowrap;
  min-width: 0px;
  overflow: visible;
  text-overflow: clip;
`

const StyledContainer = styled.div`
display: flex; align-items: center;
`

const StyledInner = styled.div`
user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: flex; align-items: center; border-radius: 3px; padding: 2px 4px; margin-left: -4px;
`

const StyledInnerWrapper = styled.span`
text-transform: initial; font-size: 12px; line-height: 1; color: rgba(55, 53, 47, 0.5); font-weight: 600; transition: color 100ms ease-out 0s;
`

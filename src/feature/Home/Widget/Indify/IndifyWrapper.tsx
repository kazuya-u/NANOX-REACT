import styled from "styled-components";

type Props = {
  url: string,
}

const IndifyWrapper: React.FC<Props> = ({ url }) => {
  return (
    <>
      <StyledWrapper_1>
        <StyledWrapper_2>
          <StyledWrapper_3>
            <StyledWrapper_4>
              <StyledWrapper_5>
                <StyledWrapper_6>
                  <StyledWrapper_7>
                    <StyledWrapper_8>
                      <StyledWrapper_9>
                        <StyledWrapper_10>
                          <StyledWrapper_11>
                            <StyledWrapper_12>
                              <StyledIframe
                                src={url}
                                frameBorder="0"
                              />
                            </StyledWrapper_12>
                          </StyledWrapper_11>
                        </StyledWrapper_10>
                      </StyledWrapper_9>
                    </StyledWrapper_8>
                  </StyledWrapper_7>
                </StyledWrapper_6>
              </StyledWrapper_5>
            </StyledWrapper_4>
          </StyledWrapper_3>
        </StyledWrapper_2>
      </StyledWrapper_1>
    </>
  )
}

const StyledWrapper_1 = styled.div`
  padding-top: 12px;
    padding-bottom: 12px;
    flex-grow: 0;
    flex-shrink: 0;
    width: calc((100% - 46px) * 0.5);
`;


const StyledWrapper_2 = styled.div`
display: flex; flex-direction: column;
`;

const StyledWrapper_3 = styled.div`
width: 100%; max-width: 100%; align-self: center; margin-top: 4px; margin-bottom: 0px;
`;

const StyledWrapper_4 = styled.div`
display: flex;
`;

const StyledWrapper_5 = styled.div`
position: relative; overflow: hidden; flex-grow: 1;
`;

const StyledWrapper_6 = styled.div`
position: relative; cursor: pointer;
`;

const StyledWrapper_7 = styled.div`
position: relative;
`;

const StyledWrapper_8 = styled.div`
display: block; pointer-events: auto; width: 100%;
`;

const StyledWrapper_9 = styled.div`
position: relative; display: flex; justify-content: center; width: 100%; min-height: 100px; height: 204px;
`;

const StyledWrapper_10 = styled.div`
position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px;
`;

const StyledWrapper_11 = styled.div`
height: 100%; width: 100%;
`;

const StyledWrapper_12 = styled.div`
position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px; pointer-events: auto;
`;

const StyledIframe = styled.iframe`
position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px; pointer-events: auto; background-color: white;
`;

export default IndifyWrapper;

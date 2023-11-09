import { useUser } from "../../../../utils/api/UserProvider";
import Layout from "./Layout/Layout";
import styled from "styled-components";
import TaskHeader from "../../Header";
import { Oval } from "react-loader-spinner";

const Index: React.FC = () => {
  const SettingsData = useUser();
  const FilterId: Array<string> = [];
  SettingsData?.included.forEach(i => {
    FilterId.push(i.attributes.drupal_internal__id);
  });
  console.log(FilterId);

  return (
    <>
      <StyledTask>
        <StyledTaskContainer>
          <TaskHeader title="Task" />
          <StyledTaskWrapper>
            <StyledTaskInnerWrapper_1>
              <StyledTaskInnerWrapper_2>
                <StyledTaskInnerWrapper_3>
                  <StyledTaskInnerWrapper_4>
                    <StyledTaskInnerWrapper_5>
                      {
                        FilterId.length 
                        !== 0 
                        ? 
                        <Layout IdArray={FilterId} />
                        : 
                        <Oval
                          height={80}
                          width={80}
                          color="#f2f2f2"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel='oval-loading'
                          secondaryColor="#849b87"
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        />
                      }
                    </StyledTaskInnerWrapper_5>
                  </StyledTaskInnerWrapper_4>
                </StyledTaskInnerWrapper_3>
              </StyledTaskInnerWrapper_2>
            </StyledTaskInnerWrapper_1>
          </StyledTaskWrapper>
        </StyledTaskContainer>
      </StyledTask>
    </>
  )
}

const StyledTask = styled.div`
  display: flex; flex-direction: column;
`;

const StyledTaskContainer = styled.div`
  width: 100%; max-width: 100%; margin-top: 2px; margin-bottom: 1px;
`;

const StyledTaskWrapper = styled.div`
width: 100%; max-width: 100%; margin-top: 1px; margin-bottom: 1px;
`;

const StyledTaskInnerWrapper_1 = styled.div`
  flex-grow: 1; flex-shrink: 0; display: flex; flex-direction: column;
`;

const StyledTaskInnerWrapper_2 = styled.div`
  position: relative;
`;

const StyledTaskInnerWrapper_3 = styled.div`
  z-index: 1; flex-grow: 1; flex-shrink: 0; overflow: auto hidden; margin-right: 0px; margin-bottom: 0px;
`;

const StyledTaskInnerWrapper_4 = styled.div`
  margin-left: 0px; margin-right: 0px; float: left; min-width: 100%;
`;

const StyledTaskInnerWrapper_5 = styled.div`
  display: flex; position: relative; flex-grow: 1; padding-bottom: 0px;
`;

export default Index;

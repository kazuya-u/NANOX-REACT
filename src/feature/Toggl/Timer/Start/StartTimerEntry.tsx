import { getTogglApiTokenLocalStorage } from '../../../../feature/AuthUser/utils/LocalStorageUtils';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TimerProjectSelect from '../components/select';
import TimerDescriptionInput from '../components/input';
import { TimePicker } from 'react-ios-time-picker';
import styled from 'styled-components';
import { GoTriangleRight } from 'react-icons/go';

type InputType = {
  description: string,
  start: string,
  project: {
    value: string,
  }
}

const StartTimerEntry = () => {
  const methods = useForm<InputType>();
  const {
    register,
  } = useForm<InputType>({
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: false,
  });
  const handleStartTimer: SubmitHandler<InputType> = async (data: InputType) => {
    // About Description.
    let description = '';
    if (data.description) {
      description = data.description;
    }

    // About start time.
    const currentDate = new Date();
    let start = currentDate.toISOString().slice(0, 19) + "+00:00";
    if (data.start) {
      start = `${data.start}:00+00:00`;
    }
    // About project, workspace data.
    const [tmpWorkspaceId, tmpProjectId] = data.project.value.split('.');
    const workspaceId = parseInt(tmpWorkspaceId, 10);
    const projectId = parseInt(tmpProjectId, 10);

    const bodyData = {
      description: description,
      start: start,
      created_with: "React",
      wid: workspaceId,
      duronly: true,
      duration: -1,
      project_id: projectId,
    };
    console.log(bodyData);

    const togglApiToken = getTogglApiTokenLocalStorage();
    fetch(`/api/api/v9/workspaces/${tmpWorkspaceId}/time_entries`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${togglApiToken}:api_token`),
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <FormProvider {...methods}>
        <StyledForm onSubmit={methods.handleSubmit(handleStartTimer)}>
          <div>
            <TimerDescriptionInput />
            {/* <StyledInput type="text" /> */}
          </div>
          <div><TimerProjectSelect /></div>
          <div>
            <div>
              <StyledButton type='submit'>
                <GoTriangleRight
                  size={20}
                />
              </StyledButton>
            </div>
          </div>
        </StyledForm>
      </FormProvider>
    </div>
  );
};

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 20px;
  border-radius: 4px;
  border: #f2f2f2 1px solid;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
background-color: #333;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default StartTimerEntry;

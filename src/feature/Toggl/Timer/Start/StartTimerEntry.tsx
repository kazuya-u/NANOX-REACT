import { getTogglApiTokenLocalStorage } from '../../../../feature/AuthUser/utils/LocalStorageUtils';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TimerProjectSelect from '../components/select';
import TimerDescriptionInput from '../components/input';

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
    console.log('description', description);
    console.log(data);
    
    
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
        <form onSubmit={methods.handleSubmit(handleStartTimer)}>        
          <div>
            <TimerDescriptionInput />
          </div>
          <TimerProjectSelect />
          <div>
            <label>Start Time:</label>
            <input
              type="datetime-local"
              {...register('start')}
            />
          </div>
          <div>
            <button type='submit'>Start Timer</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default StartTimerEntry;

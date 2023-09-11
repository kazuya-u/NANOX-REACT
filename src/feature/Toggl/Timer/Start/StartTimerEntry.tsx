import { getTogglApiTokenLocalStorage } from '../../../../feature/AuthUser/utils/LocalStorageUtils';
import { useForm } from 'react-hook-form';

type InputType = {
    description: string,
    start: string,
}

const StartTimerEntry = () => {
  const {
    register,
    handleSubmit
  } = useForm<InputType>({
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: false,
  });

  const handleStartTimer = (data: InputType) => {
    const currentDate = new Date();
    let start = currentDate.toISOString().slice(0, 19) + "+00:00";
    if (data.start) {
      start = `${data.start}:00+00:00`;
    }
    const bodyData = {
      description: data.description,
      start: start,
      created_with: "React",
      wid: 7204210,
      duronly: true,
      duration: -1
    };
    const togglApiToken = getTogglApiTokenLocalStorage();
    fetch(`/api/api/v9/workspaces/7204210/time_entries`, {
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
      <form onSubmit={handleSubmit(handleStartTimer)}>        
        <div>
          <label>Description:</label>
          <input
            {...register('description')}
            type="text"
          />
        </div>
        {/* <div>
          <label>Project ID:</label>
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div> */}
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
    </div>
  );
};

export default StartTimerEntry;

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { SchedulerDataItem, fetchTimeEntryData } from './TimeEntryData';
import { useEffect, useState } from 'react';

const currentDate = '2023-09-08';


export const TogglLogCalendar = () => {
  const [schedulerData, setSchedulerData] = useState<SchedulerDataItem[]>([]);

  useEffect(() => {
    fetchTimeEntryData()
      .then((data) => {
        console.log(data);
        setSchedulerData(data);
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
      });
  }, []);
  
  return (
    <Scheduler
      data={schedulerData}
      // height={660}
    >
      <ViewState
        defaultCurrentDate={currentDate}
      />
      <WeekView
        startDayHour={0}
        endDayHour={24}
      />
      <Appointments />
    </Scheduler>
  )
}

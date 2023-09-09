import { SchedulerDataItem, fetchTimeEntryData } from './TimeEntryData';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'


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
    <FullCalendar
      plugins={[ timeGridPlugin ]}
      events={schedulerData}
    />
  )
}

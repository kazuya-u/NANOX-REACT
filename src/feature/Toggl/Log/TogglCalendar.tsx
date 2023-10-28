import { fetchTimeEntryData } from './TimeEntryData';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import timeGridPlugin from '@fullcalendar/timegrid'
import { SchedulerDataItem } from '../Type/Index';
import { StyleCalendar } from '../../../components/Calendar/styled';


export const TogglLogCalendar = (): JSX.Element => {
  const [schedulerData, setSchedulerData] = useState<SchedulerDataItem[]>([]);

  useEffect(() => {
    fetchTimeEntryData()
      .then((data) => {
        setSchedulerData(data);
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
      });
  }, []);
  return (
    <StyleCalendar>
      <StyleWrapper>
        <FullCalendar
          allDaySlot={false}
          buttonText={{ today: 'Today' }}
          eventBackgroundColor={'#acaba9'}
          eventBorderColor={'#acaba9'}
          events={schedulerData}
          eventTextColor={'#fff'}
          headerToolbar={{ start: 'title', center: '', right: 'prev today next' }}
          plugins={[timeGridPlugin, interactionPlugin]}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: false
          }}
          titleFormat={{ year: 'numeric', month: 'narrow', day: '2-digit' }}
          locale="ja"
          selectable={true}
          dateClick={function(e) {
            console.log(e);
          }}
        />
      </StyleWrapper>
    
    </StyleCalendar>
  )
}


const StyleWrapper = styled.div`

`

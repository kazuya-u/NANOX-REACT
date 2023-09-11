import { fetchTimeEntryData } from './TimeEntryData';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import timeGridPlugin from '@fullcalendar/timegrid'
import { SchedulerDataItem } from '../Type/Index';


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
    <StyleWrapper>
      <FullCalendar
        allDaySlot={true}
        allDayText={''}
        buttonText={{ today: 'Today' }}
        eventBackgroundColor={'#FFFFFF'}
        eventBorderColor={'#acaba9'}
        events={schedulerData}
        eventShortHeight={100}
        eventTextColor={'#37362f'}
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
      />
    </StyleWrapper>
  )
}


const StyleWrapper = styled.div`
.fc .fc-daygrid-body-natural .fc-daygrid-day-events {
  margin: 0;
  min-height: 0;
}
.fc .fc-col-header-cell-cushion {
  display: inline-block;
  padding: 8px 4px;
}
.fc .fc-col-header-cell {
  font-size: 9px;
  font-weight: 800;
}
  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0;
  }
  .fc .fc-toolbar-title {
    font-size: 1rem;
    color: #37362f;
  }
  .fc .fc-button-primary {
    font-size: 0.75rem;
    background-color: #ffffff00;
    color: #acaba9;
    border: none;
    outline: none;
  }
  .fc .fc-today-button {
    background-color: #ffffff00;
    color: #37362f;
    border: none;
    outline: none;
  }
  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled).fc-button-active {
    background-color: #ffffff00;
    color: #acaba9;
    box-shadow: none;
  }
  .fc .fc-button-primary:not(:disabled):focus,
  .fc .fc-button-primary:not(:disabled).fc-button-focus {
    background-color: #ffffff00;
    color: #acaba9;
    box-shadow: none;
  }
  .fc .fc-today-button:disabled {
    opacity: 1;
  }
  .fc-timegrid-slot {
    padding: 8px 4px;
  }
  .fc-direction-ltr .fc-timegrid-slot-label-frame {
    text-align: center;
  }
  .fc .fc-timegrid-slots {
    font-size: 9px;
    font-weight: 800;
  }
`

import { Oval } from 'react-loader-spinner'
import { StyleCalendar } from '../components/Calendar/styled';
import { useUser } from '../utils/api/UserProvider';
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react';
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

const Event: React.FC = () => {
  const SettingsData = useUser();
  if (!SettingsData) {
    return (
      <>
        <div>
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
        </div>
      </>
    )
  }
  if (!SettingsData?.data.attributes.field_google_calender) {
    return (
      <>
        カレンダーの設定が不足しています。
      </>
    )
  }
  const eventData = SettingsData?.data.attributes.field_google_calender.map(i => {
    return {
      googleCalendarApiKey: i.key,
      googleCalendarId: i.value,
    };
  });

  const drop = (info) => {
    console.log(info)
  }
  return (
    <StyleCalendar>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventSources={eventData}
        eventDisplay='block'
        editable
        timeZone='Asia/Tokyo'
        locale="ja"
        headerToolbar={{
          right: 'dayGridMonth,timeGridWeek',
        }}
        selectMirror
        eventDrop={drop}
        droppable={true}
        // eventClick={function (e) {
        //   console.log(e);
        // }}
        // eventBackgroundColor='#fff'
        dayCellContent={function (e) {
          return e.date.getDate();
        }}
        buttonText={{ today: 'Today' }}
      />
    </StyleCalendar>
  );
}

export default Event;

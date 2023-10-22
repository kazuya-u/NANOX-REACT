
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react';
import styled from 'styled-components';
import { getUserSettingsIdFromLocalStorage } from '../feature/AuthUser/utils/LocalStorageUtils';
import { useFetchDataNoMutate } from '../utils/fetchData';
import { BASE_API_URL } from '../utils/EndPoint';

interface UsData {
  data: {
    "type": "user--user",
    "id": string,
    "attributes": {
      "display_name": string,
      "drupal_internal__uid": number,
      "name": string,
      "mail": string,
      "timezone": string,
      "field_username": string,
      "field_pokemon_number": string,
      "field_chatwork_api_room_id": [],
      "field_google_calender": Array<KeyValueType>,
      "field_chatwork_api_token": string,
      "field_toggl_api_token": string,
      "field_slack_app_token": string,
    }
  }
}

interface KeyValueType {
  key: string,
  value: string,
}

const Event: React.FC = () => {
  const usId = getUserSettingsIdFromLocalStorage();
  const { data: SettinsData } = useFetchDataNoMutate<UsData>(`${BASE_API_URL}/jsonapi/us/us/${usId}`);
  
  const api_key = SettinsData?.data.attributes.field_google_calender[0].key;
  const googleCalendarId = {
    googleCalendarApiKey: api_key,
    googleCalendarId: SettinsData?.data.attributes.field_google_calender[0].value,
  };
  if (!SettinsData) {
    return
  }
  return (
    <StyleCalendar>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        eventSources={
          [googleCalendarId]
        }
        eventDisplay='block'
        editable
        timeZone='Asia/Tokyo'
        locale="ja"
        eventClick={function(e) {
          console.log(e);
        }}
        // eventBackgroundColor='#fff'
        dayCellContent={function(e){
          return e.date.getDate();
        }}
        buttonText={{ today: 'Today' }}
      />
    </StyleCalendar>
  );
}

const StyleCalendar = styled.div`
.fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
  position: relative;
  padding-left: 1px;
}
.fc-scrollgrid-section.fc-scrollgrid-section-header  {
  margin-top: 0px;
}
.fc-col-header-cell.fc-day {
  font-size: 12px;
  color: #37352f7f;
  font-weight: 400;
}
.fc-daygrid-day-frame.fc-scrollgrid-sync-inner {
  position: relative; flex: 1 0 0px; cursor: default;
}
.fc-daygrid-day-number {
  font-size: 14px; height: 24px; line-height: 24px; text-align: right; transition: color 100ms ease-out 0s;
}

.fc-daygrid-day-events {
  margin-top: 2px;
  margin-left: 2px;
  margin-right: 2px;
}
.fc-event.fc-event-draggable.fc-event-start.fc-event-end.fc-event-today.fc-daygrid-event.fc-daygrid-block-event.fc-h-event {
  padding: 3px 6px;
  font-weight: 400;
  display: flex;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  height: 100%;
  border-radius: 3px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
  align-items: flex-start;
  flex-direction: column;
}

.fc-event-time {
  font-weight: 400;
}
`;

export default Event;

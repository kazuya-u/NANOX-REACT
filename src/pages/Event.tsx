
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react';
import { getUserSettingsIdFromLocalStorage } from '../feature/AuthUser/utils/LocalStorageUtils';
import { useFetchDataNoMutate } from '../utils/fetchData';
import { BASE_API_URL } from '../utils/EndPoint';
import { Oval } from 'react-loader-spinner'
import { StyleCalendar } from '../components/Calendar/styled';

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
  if (!SettinsData) {
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
  if (!SettinsData?.data.attributes.field_google_calender) {
    return (
      <>
        カレンダーの設定が不足しています。
      </>
    )
  }
  const eventData = SettinsData?.data.attributes.field_google_calender.map(i => {
    return {
      googleCalendarApiKey: i.key,
      googleCalendarId: i.value,
    };
  });
  
  return (
    <StyleCalendar>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        eventSources={eventData}
        eventDisplay='block'
        editable
        timeZone='Asia/Tokyo'
        locale="ja"
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

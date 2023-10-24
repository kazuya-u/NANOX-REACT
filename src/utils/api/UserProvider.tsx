import { createContext, useContext, ReactNode } from 'react';
import { getUserSettingsIdFromLocalStorage } from '../../feature/AuthUser/utils/LocalStorageUtils';
import { useFetchData } from '../fetchData';
import { BASE_API_URL } from '../EndPoint';

interface UserAttributes {
  display_name: string,
  drupal_internal__uid: number,
  name: string,
  mail: string,
  timezone: string,
  field_username: string,
  field_pokemon_number: string,
  field_chatwork_api_room_id: Array<{ key: string, value: string }>;
  field_chatwork_api_token: string,
  field_toggl_api_token: string,
  field_slack_app_token: string,
  field_google_calender: Array<{ key: string, value: string }>;
}

interface UserData {
  "type": "user--user",
  "id": string,
  "attributes": UserAttributes
}

interface User {
  data: UserData
  included: RelatedType[]
}

interface RelatedType {
  id: string,
  "attributes": {
    drupal_internal__id: string,
  },
}

interface UserContextType {
  user: User | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser hook is being used outside of the UserProvider context. Make sure to use this hook within a component that is wrapped with UserProvider.');
  }
  return context.user;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const usId = getUserSettingsIdFromLocalStorage();
  const { data: user } = useFetchData<User>(`${BASE_API_URL}/jsonapi/us/us/${usId}?include=field_ref_status_filter`);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

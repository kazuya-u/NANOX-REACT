import { GoBook, GoClock, GoGear, GoHome, GoPerson, GoQuestion, GoTasklist } from "react-icons/go";
import { ListItem } from './ListItem';

export default function List() {
  return (
    <ul>
      <ListItem icon={GoHome} text='Home' link='/' />
      <ListItem icon={GoTasklist} text='Tasks' link='tasks' />
      <ListItem icon={GoBook} text='Note' link='notes' />
      <ListItem icon={GoClock} text='Toggl' link='toggl' />
      <ListItem icon={GoGear} text='Settings' link='settings' />
      <ListItem icon={GoQuestion} text='Contact' link='contact' />
      <ListItem icon={GoPerson} text='About' link='about' />
    </ul>
  )
}

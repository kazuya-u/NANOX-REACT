import React from "react";
import { Form } from "react-router-dom";

interface ContactProps {
  first: string,
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

const Contact: React.FC = () => {
  const contact: ContactProps = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };
  
  return (
    <div id="contact">
      <div>
        <img
         key={contact.avatar}
         src={contact.avatar || undefined}
        />
      </div>
    </div>
  )
}

export default Contact;
import React from "react";

interface ContactProps {
  message: string;
}

const Contact: React.FC<ContactProps> = ({message}) => {
  return (
    <h2>{message}</h2>
  )
}

export default Contact;
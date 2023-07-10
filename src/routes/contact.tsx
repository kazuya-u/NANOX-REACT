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
    first: "Kazuya",
    last: "Umeki",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "kazuya_um_k_",
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
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
            ) : (
              <i>No Name</i>
            )}{" "}
          <Favorite contact={contact} />
        </h1>
        
        {contact.twitter && (
          <p>
            <a href={`http://twitter.com/${contact.twitter}`} 
            target="_blank">
              {contact.twitter}
            </a>
          </p>
        )}
        
        {contact.notes && <p>{contact.notes}</p>}
        
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destory"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
        
      </div>
    </div>
  )
}

function Favorite({ contact }) {
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  )
}

export default Contact;
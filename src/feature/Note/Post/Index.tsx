import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

const Index: React.FC = () => {

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/note/`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        data: {
          type: "node--note",
          attributes: {
            title: "手書きJSONデータ",
            field_description: "手書きJSONデータ",
          },
        },
      }),
    });
    console.log(res);

    if (res.ok) {
      const resData = await res.json();
      console.log(resData);
    }
    else {
      console.log('aaa');
      
    }
    
  }

  return (
    <>
      <div>Add Note</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit">送信</Button>
      </form>
    </>
  );
};

export default Index;

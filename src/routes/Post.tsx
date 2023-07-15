import axios from 'axios';
import { useEffect, useState } from 'react';

const Post: React.FC = () => {
  
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://drupal.sandbox.dev.lando/node/8?_format=json"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log("data", data.nid[0].value);
  return (
    <>
      <h2>Single Post</h2>
      <div>
        <p>ID:{data.nid[0].value}</p>
        <p>タイトル:{data.title[0].value}</p>
      </div>
    </>
  );
};

export default Post;


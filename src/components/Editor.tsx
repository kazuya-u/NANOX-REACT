import React, { useState } from 'react';
import axios from 'axios';

const DrupalNodePost = () => {
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');

  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleBodyChange = (e) => {
  //   setBody(e.target.value);
  // };

  const handleSubmit = async () => {
    const nodeData = {
      "data": {
        "type": "node--task",
        "attributes": {
          "title": "Reactからついに"
        }
      }
    };

    try {
      const response = await axios.post('https:/drupal.sandbox.dev.lando/jsonapi/node/task', nodeData, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
          // 任意の認証方法を使用する場合には、適切なトークンを設定します
          // 例: 'Authorization': 'Bearer YOUR_API_TOKEN',
        },
      });
      console.log('Nodeが投稿されました。', response.data);
    } catch (error) {
      console.error('Nodeの投稿に失敗しました。', error);
    }
  };

  return (
    <div>
      <h2>Nodeを投稿する</h2>
      {/* <input type="text" value={title} onChange={handleTitleChange} placeholder="タイトル" />
      <textarea value={body} onChange={handleBodyChange} placeholder="本文" /> */}
      <button onClick={handleSubmit}>投稿する</button>
    </div>
  );
};

export default DrupalNodePost;
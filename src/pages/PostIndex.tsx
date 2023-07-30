import { useEffect, useState } from "react";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import styled from "styled-components";

const baseURL = "https://drupal.sandbox.dev.lando/jsonapi/node/task";

type LoaderData = {
  posts: {
    data: PostData[],
  }
}

type PostData = {
  id: number;
  attributes: {
    title: string;
  };
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(baseURL);
  const posts = await res.json();
  console.log(posts);
  return { posts };
}

const TaskIndex: React.FC = () => {
  const { posts } = useLoaderData() as LoaderData;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseURL);
        const posts = await res.json();
        console.log(posts);
        setLoading(false);
      } catch (error) {
        console.error('データの取得に失敗しました。', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <p className="loader">ロード中。。。</p>
      ) : (
        <>
          <Container>
            <StyledLink to={'/addtask'}>
              Taskの追加
            </StyledLink>
          </Container>
            <Container>
              <List>
                {posts.data.map((post) => (
                  <ListItem key={post.id}>
                    <StyledLink to={`/tasks/${post.id}`}>
                      <TaskName>{post.attributes.title}</TaskName>
                      <ProjectName>Project:</ProjectName>
                    </StyledLink>
                  </ListItem>
                ))}
              </List>
          </Container>
        </>


      )}
    </>
  );
}

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 520px;
`;

const ListItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

const TaskName = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const ProjectName = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 0;
`;

export default TaskIndex;

import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import styled from "styled-components";

const baseURL = "https://drupal.sandbox.dev.lando/tasks";

export const loader: LoaderFunction = async () => {
  const res = await fetch(baseURL);
  const posts = await res.json();
  console.log(posts);
  return { posts };
}

type LoaderData = {
  posts: Post[];
}

type Post = {
  nid: string;
  title: string;
  name: string;
};

const PostIndex: React.FC = () => {
  const { posts } = useLoaderData() as LoaderData;
  return (
    <>
      <Container>
        <StyledLink to={'/addtask'}>
          Taskの追加
        </StyledLink>
      </Container>
      <Container>
        <List>
          {posts.map((post) => (
            <ListItem key={post.nid}>
              <StyledLink to={`/posts/${post.nid}`}>
                <TaskName>{post.title}</TaskName>
                <ProjectName>Project:{post.name}</ProjectName>
              </StyledLink>
            </ListItem>
          ))}
        </List>
      </Container>
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

export default PostIndex;

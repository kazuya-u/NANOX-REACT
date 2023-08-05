import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

export const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  width: 520px;
`;

export const ListItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

export const TaskName = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

export const ProjectName = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 0;
`;

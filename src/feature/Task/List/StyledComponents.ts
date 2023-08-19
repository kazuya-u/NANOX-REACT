import { Link } from "react-router-dom";
import styled from "styled-components";

export const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  border-top : 1px solid #a9a9a9;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
`;

export const TaskLeftWrapper = styled.div`

`;

export const TaskRightWrapper = styled.div`
  margin-top: auto;
  text-align: right;
`;

export const TaskName = styled.div`
  font-size: 14px;
`;


export const TaskDescription = styled.div`
  font-size: 12px;
`;

export const ProjectName = styled.p`
  font-size: 12px;
  color: #555555;
`;

export const TagContainer = styled.div`
  border-radius: 2px;
  line-height: 1.2;
  display: inline-block;
`;

export const Tag = styled.span`
  color: #797575;
  background-color: #7a757519;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 10px;
  margin-right: 4px;
`;

export const Deadline = styled.p`
  text-align: right;
  font-size: 12px;
  color: #999999;
  margin-bottom: 4px;
  grid-area: 'deadline';
`;

export const Status = styled.p`
  font-size: 12px;
  color: #333333;
`;

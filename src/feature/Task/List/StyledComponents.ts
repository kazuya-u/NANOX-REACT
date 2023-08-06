import { Link } from "react-router-dom";
import styled from "styled-components";

export const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const StyledLink = styled(Link)`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 8px;
  display: flex;
  flex-direction: column;
`;

export const TaskName = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;

export const ProjectName = styled.p`
  font-size: 14px;
  color: #555555;
  margin-bottom: 4px;
`;

export const TagContainer = styled.div`
  padding: 4px 8px 3px;
  border-radius: 2px;
  line-height: 1.2;
  font-size: 11px;
  font-size: 0.6875rem;
  display: inline-block;
`;

export const Tag = styled.span`
  color: #797575;
  background-color: #7a757519;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  margin-right: 4px;
`;

export const Deadline = styled.p`
  font-size: 14px;
  color: #999999;
  margin-bottom: 4px;
`;

export const Status = styled.p`
  font-size: 14px;
  color: #333333;
`;

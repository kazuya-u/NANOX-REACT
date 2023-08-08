import { styled } from "styled-components";

export const TaskDetailContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
`;

export const TaskDetailWrapper = styled.div`
  padding: 0 0 5px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const TaskDetailItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  font-weight: 500;
`;
export const TaskDetailItemLabel = styled.div`
  color: #797575;
  font-weight: 400;
`;

export const TaskName = styled.h2`
  font-size: 32px;
  line-height: 1.4;
  font-weight: 700;
  margin: 0;
`;

export const TaskProject = styled.div`
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
`;

export const TaskStatus = styled.div`
  display: inline-flex;
  align-items: center;
  flex-shrink: 1;
  min-width: 0px;
  max-width: 100%;
  height: 20px;
  border-radius: 10px;
  padding-left: 7px;
  padding-right: 9px;
  font-size: 14px;
  line-height: 120%;
  color: rgb(24, 51, 71);
  background: rgb(211, 229, 239);
  margin: 0px;
`;

export const TaskBody = styled.div`
  padding: 24px 32px;
  border: 1px solid #20252c;
  border-radius: 6px;
`;

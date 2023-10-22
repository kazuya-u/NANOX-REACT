import styled from "styled-components";

export const StyleCalendar = styled.div`
.fc.fc-media-screen.fc-direction-ltr.fc-theme-standard {
  position: relative;
  padding-left: 1px;
}
.fc-scrollgrid-section.fc-scrollgrid-section-header  {
  margin-top: 0px;
}
.fc-col-header-cell.fc-day {
  font-size: 12px;
  color: #37352f7f;
  font-weight: 400;
}
.fc-daygrid-day-frame.fc-scrollgrid-sync-inner {
  position: relative; flex: 1 0 0px; cursor: default;
}
.fc-daygrid-day-number {
  font-size: 14px; height: 24px; line-height: 24px; text-align: right; transition: color 100ms ease-out 0s;
}

.fc-daygrid-day-events {
  margin-top: 2px;
  margin-left: 2px;
  margin-right: 2px;
}
.fc-event.fc-event-draggable.fc-event-start.fc-event-end.fc-event-today.fc-daygrid-event.fc-daygrid-block-event.fc-h-event {
  padding: 3px 6px;
  font-weight: 400;
  display: flex;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  height: 100%;
  border-radius: 3px;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;
  align-items: flex-start;
  flex-direction: column;
}

.fc-event-time {
  font-weight: 400;
}
`;

import React, { useState } from "react";
import { StopTimerEntry } from "../StopTimerEntry";
import { GoSquareFill } from "react-icons/go";

type ButtonProps = {
  workspaceId: string,
  timeEntryId: string,
}

const TimerStopButton: React.FC<ButtonProps> = ({ workspaceId, timeEntryId }) => {
  const [stopped, setStopped] = useState(false);

  const handleStopButtonClick = async () => {
    try {
      const response = await StopTimerEntry(workspaceId, timeEntryId);
      console.log(response);
      setStopped(true);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <button onClick={handleStopButtonClick} disabled={stopped}>
      {/* {stopped ? "停止済み" : "タイマー停止"} */}
      <GoSquareFill />
    </button>
  );
};

export default TimerStopButton;

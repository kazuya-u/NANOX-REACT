import { useEffect, useState } from "react";
import { fetchCurrentTimerEntry } from "./CurrentTimerEntry";
import { TogglEnttyDataItem } from "../Type/Index";
import TimerStopButton from "./components/button";
import StartTimerEntry from "./Start/StartTimerEntry";

const Timer = () => {
  const [currentEntty, setCurrentEntty] = useState<TogglEnttyDataItem | null>();
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  useEffect(() => {
    const fetchAndSetCurrentEntty = async () => {
      try {
        const data = await fetchCurrentTimerEntry();
        setCurrentEntty(data);
        
        if (data && data.start) {
          const interval = setInterval(() => {
            const startTime = new Date(data.start).getTime();
            const currentTime = new Date().getTime();
            const elapsedMilliseconds = currentTime - startTime;
            setElapsedTime(elapsedMilliseconds);
          }, 1000);

          return () => {
            clearInterval(interval);
          };
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };

    fetchAndSetCurrentEntty();
  }, []);
  if (!currentEntty) {
    return (
      <div>
        <StartTimerEntry />
      </div>
    )
  }
  
  return (
    <>
      {currentEntty.description}
      <div>
        {formatElapsedTime(elapsedTime)}
      </div>
      <TimerStopButton workspaceId={currentEntty.workspace_id} timeEntryId={currentEntty.id} />
    </>
  )
}

function formatElapsedTime(milliseconds: number | null): string {
  if (milliseconds === null) {
    return "00:00:00";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatNumber = (num: number) => String(num).padStart(2, "0");
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
}

export default Timer;

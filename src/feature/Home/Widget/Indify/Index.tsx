import Gap from "../../Gap";
import IndifyWrapper from "./IndifyWrapper";

const Indify: React.FC = () => {
  return (
    <>
      <IndifyWrapper url={"https://indify.co/widgets/live/clock/cueAiCZkeMALebWVj1eQ"} />
      <Gap />
      <IndifyWrapper url={"https://indify.co/widgets/live/progressBar/o3giVdXmmIahhzqSQW7h"} />
    </>
  )
}

export default Indify;

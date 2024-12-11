import { Devvit, useInterval, useState } from "@devvit/public-api"

let hasExecuted = false;

export const Countdown = ({handleSubmit}:any) =>{
  const [countdown, setCountdown] = useState(10);
  const updateInterval = useInterval(() => {
    
    setCountdown((prevCount) => {
      if (prevCount > 0) {
        return prevCount - 1;
      }
      updateInterval.stop();
     if(!hasExecuted){handleSubmit(); hasExecuted=true}

      return 0;
    });
  }, 1000);
  
  updateInterval.start();
  
    return(
      <vstack width='100%'>
      <vstack height="5px" width={`${countdown*10}%`} backgroundColor='#D93A00'/>
      </vstack>
    )
}
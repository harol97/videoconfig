
import { useEffect, useState } from "react";

export function useSpeakersInfo() {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    navigator
      .mediaDevices
      .then(() => {
        navigator.mediaDevices
          .enumerateDevices()
          .then((devices) =>
            setSpeakers(devices.filter((device) => device.kind === "audiooutput")),
          );
      });
  }, []);
  return speakers;
}

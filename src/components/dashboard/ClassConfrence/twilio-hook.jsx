
import { useEffect } from "react";
import { connect } from "twilio-video";

export function useStartTwilio(
  token,
  setParticipants,
  setLocalParticipant,
  videoMediaInfo,
  audioMediaInfo
) {
  useEffect(() => {
    const func = async () => {
      //
      //if (!token || !room || !camera || !microphoneInfo || !cameraWebTrack)
      //  return;
      if (!token  || !audioMediaInfo || !videoMediaInfo)
        return;

      console.log({audioMediaInfo, videoMediaInfo})

      let newTracks= [];

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {deviceId: audioMediaInfo.deviceId},
        });
      const streamVideo = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: videoMediaInfo.deviceId}
      })
      newTracks.push(stream.getTracks()[0]);

      const roome = await connect(token, {
        name: "test",
        tracks: [stream.getTracks()[0], streamVideo.getTracks()[0]],
      });
      setLocalParticipant(roome.localParticipant);
      setParticipants((prev) => {
        const usernames = prev.map((p) => p.username);
        if (usernames.includes(roome.localParticipant.identity)) return prev;
        return [
          ...prev,
          {
            sid: roome.localParticipant.sid,
            username: roome.localParticipant.identity,
            stream: streamVideo.getTracks()[0],
          },
        ];
      });
      roome.participants.forEach((participant) =>
        enableAlreadyParticipant(participant, setParticipants),
      );
      roome.on("participantConnected", (participant) => {
        enableAlreadyParticipant(participant, setParticipants);
      });
      roome.on("participantDisconnected", (participant) => {
        setParticipants((participants) =>
          participants.filter((pt) => pt.sid !== participant.sid),
        );
      });
    };
    func();
  }, [token, setLocalParticipant, setParticipants, audioMediaInfo, videoMediaInfo]);
}

const enableAlreadyParticipant = (
  participant,
  setParticipants,
) => {
  const trackPublished = Array.from(participant.videoTracks.values())[0];
  const trackAudioPublished = Array.from(participant.audioTracks.values())[0];
  if (!trackPublished) return;
  if (
    trackPublished.isSubscribed &&
    trackAudioPublished &&
    trackAudioPublished.isSubscribed
  ) {
    const track = trackPublished.track;
    const audioTrack = trackAudioPublished.track;
    setParticipants((participants) => {
      if (!track) return participants;
      return [
        ...participants,
        {
          sid: participant.sid,
          username: participant.identity,
          stream: track.mediaStreamTrack,
          audioStream: audioTrack?.mediaStreamTrack,
        },
      ];
    });
  }

  participant.on("trackSubscribed", (track) => {
    setParticipants((participants) => {
      const finalParticipants = participants.filter(
        (p) => p.username !== participant.identity,
      );
      const localParticipant = participants.find(
        (p) => p.username === participant.identity,
      );
      const objToUpdate = {
        ...localParticipant,
        sid: participant.sid,
        username: participant.identity,
      };
      if (track.kind === "video")
        objToUpdate["stream"] = track.mediaStreamTrack;
      if (track.kind === "audio")
        objToUpdate["audioStream"] = track.mediaStreamTrack;
      finalParticipants.push(objToUpdate);

      return finalParticipants;
    });
  });
};

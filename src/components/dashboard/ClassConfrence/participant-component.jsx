export default function ParticipantComponent({ participant }) {
  console.log({participant})
      // <p className="text-center font-bold">{participant.username}</p>
  return (
    <div className="flex top-0 bottom-0 right-0 left-0  box-border w-[full] h-[full] flex-col absolute">
      <video
        autoPlay
        playsInline
        className="w-[100%] h-[100%]  object-fill"
        ref={(element) => {
          if (!participant.stream) return;
          const media = new MediaStream();
          media.addTrack(participant.stream);
          if (element) element.srcObject = media;
        }}
      />
      <audio
        autoPlay
        ref={(element) => {
          if (!element) return;
          if (!participant.audioStream) return;
          const media = new MediaStream();
          media.addTrack(participant.audioStream);
          element.srcObject = media;
        }}
        hidden
      ></audio>
    </div>
  );
}

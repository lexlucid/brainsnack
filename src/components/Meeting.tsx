"use client"


import React, { useEffect, useMemo, useRef, useState } from "react";
import { Client } from 'appwrite';
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "@/app/api/videosdk";
import ReactPlayer from "react-player";

const client = new Client();
client.setProject('678aa1b20034bcb0afd1');

function JoinScreen({ getMeetingAndToken }: { getMeetingAndToken: (id: string | null) => Promise<void> }) {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
    console.log(getMeetingAndToken(meetingId))
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button onClick={onClick}>Join</button>
      {" or "}
      <button onClick={onClick}>Create Meeting</button>
    </div>
  );
}

interface ParticipantViewProps {
    participantId: string;
}

function ParticipantView(props: ParticipantViewProps) {
    const micRef = useRef<HTMLAudioElement>(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);

    const videoStream = useMemo<MediaStream | undefined>(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div key={props.participantId}>
            <p>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    playsinline
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={videoStream}
                    height={"200px"}
                    width={"300px"}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </div>
    );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
    </div>
  );
}

interface MeetingViewProps {
    meetingId: string;
    onMeetingLeave: () => void;
}

function MeetingView(props: MeetingViewProps) {
    const [joined, setJoined] = useState<"JOINED" | "JOINING" | null>(null);
    const { join } = useMeeting();
    const { participants } = useMeeting({
        onMeetingJoined: () => {
            setJoined("JOINED");
        },
        onMeetingLeft: () => {
            props.onMeetingLeave();
        },
    });
    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    return (
        <div className="container">
            <h3>Meeting Id: {props.meetingId}</h3>
            {joined && joined === "JOINED" ? (
                <div>
                    <Controls />
                    {[...participants.keys()].map((participantId) => (
                        <ParticipantView
                            participantId={participantId}
                            key={participantId}
                        />
                    ))}
                </div>
            ) : joined && joined === "JOINING" ? (
                <p>Joining the meeting...</p>
            ) : (
                <button onClick={joinMeeting}>Join</button>
            )}
        </div>
    );
}

function Meeting() {
  const [meetingId, setMeetingId] = useState<string | null>(null);

interface GetMeetingAndTokenProps {
    (id: string | null): Promise<void>;
}

const getMeetingAndToken: GetMeetingAndTokenProps = async (id) => {
    const meetingId: string =
        id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
};

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
        debugMode: false
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default Meeting;
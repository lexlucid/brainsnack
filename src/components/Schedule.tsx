import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";

// Mock data for co-working sessions
const sessions = [
  { id: 1, title: "Morning Productivity", startTime: "2023-09-27T09:00:00", endTime: "2023-09-27T11:00:00", attendees: 5 },
  { id: 2, title: "Lunch & Learn: React Hooks", startTime: "2023-09-27T12:00:00", endTime: "2023-09-27T13:00:00", attendees: 10 },
  { id: 3, title: "Afternoon Focus Session", startTime: "2023-09-27T14:00:00", endTime: "2023-09-27T16:00:00", attendees: 7 },
  { id: 4, title: "Evening Networking", startTime: "2023-09-27T18:00:00", endTime: "2023-09-27T19:30:00", attendees: 15 },
]


export default function Schedule () {

    // function MeetingView(props: MeetingViewProps) {
    //     const [joined, setJoined] = useState<"JOINED" | "JOINING" | null>(null);
    //     const { join } = useMeeting();
    //     const { participants } = useMeeting({
    //         onMeetingJoined: () => {
    //             setJoined("JOINED");
    //         },
    //         onMeetingLeft: () => {
    //             props.onMeetingLeave();
    //         },
    //     });
    //     const joinMeeting = () => {
    //         setJoined("JOINING");
    //         join();
    //     };
    
    //     return (
    //         <div className="container">
    //             <h3>Meeting Id: {props.meetingId}</h3>
    //             {joined && joined === "JOINED" ? (
    //                 <div>
    //                     <Controls />
    //                     {[...participants.keys()].map((participantId) => (
    //                         <ParticipantView
    //                             participantId={participantId}
    //                             key={participantId}
    //                         />
    //                     ))}
    //                 </div>
    //             ) : joined && joined === "JOINING" ? (
    //                 <p>Joining the meeting...</p>
    //             ) : (
    //                 <button onClick={joinMeeting}>Join</button>
    //             )}
    //         </div>
    //     );
    // }
    return (     
    <main className="flex-1 overflow-y-auto p-6">
    <div className="grid gap-6">
      {sessions.map((session) => (
        <Card key={session.id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{session.title}</CardTitle>
            <Button size="sm" variant="outline">
              Join
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">
              {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(session.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </main>
    )
}
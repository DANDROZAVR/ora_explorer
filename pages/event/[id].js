// event/[id].js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EventInfo({ event }) {
  const [eventInfo, setEventInfo] = useState(null);
  const [oppositeInfo, setOppositeInfo] = useState(null);

  useEffect(() => {
    async function fetchEventInfo() {
      try {
        const res = await fetch(`/api/event/${event}`);
        if (res.ok) {
          const data = await res.json();
          console.log('Event info data:', data); // Debugging line
          setEventInfo(data);

          if (data.opposite) {
            setOppositeInfo(data.opposite);
          }
        } else {
          console.error('Failed to fetch event info');
        }
      } catch (error) {
        console.error('Error fetching event info:', error);
      }
    }

    fetchEventInfo();
  }, [event]);

  const getOppositeLink = () => {
    if (oppositeInfo) {
      return `/event/${oppositeInfo.tx_id}`;
    }
    return null;
  };

  const getOppositeText = () => {
    if (eventInfo?.type === 'request') {
      return 'Check Response Info';
    }
    if (eventInfo?.type === 'response') {
      return 'Check Request Info';
    }
    return 'Check Opposite Info';
  };

  return (
    <div className="event-info-page">
      <h1>{eventInfo?.type === 'request' ? 'Request Information' : 'Response Information'}</h1>
      {eventInfo ? (
        <div>
          <p><strong>TX ID:</strong> {eventInfo.tx_id}</p>
          <p><strong>Chain ID:</strong> {eventInfo.chain_id}</p>
          <p><strong>Address:</strong> {eventInfo.user_address}</p>
          <p><strong>Text:</strong> {eventInfo.text}</p>
          <p><strong>Block Number:</strong> {eventInfo.block_number}</p>
          <p><strong>Request id:</strong> {eventInfo.req_id}</p>
          <p><strong>Timestamp:</strong> {new Date(eventInfo.timestamp * 1000).toLocaleString()}</p>
          {oppositeInfo ? (
            <div>
              <p><strong>Opposite Transaction:</strong></p>
              <Link href={getOppositeLink()}>
                <span className="button">{getOppositeText()}</span>
              </Link>
            </div>
          ) : (
            <p>No opposite transaction found.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <style jsx>{`
        .event-info-page {
          padding: 2rem;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
        .button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}

// Fetch txn info server-side for initial render
export async function getServerSideProps(context) {
  const { id } = context.query;
  return { props: { event: id } };
}

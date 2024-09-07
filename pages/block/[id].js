import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlockInfo({ block }) {
  const [blockInfo, setBlockInfo] = useState(null);
  const [oppositeInfo, setOppositeInfo] = useState(null);

  useEffect(() => {
    async function fetchBlockInfo() {
      try {
        const res = await fetch(`/api/block/${block}`);
        if (res.ok) {
          const data = await res.json();
          console.log('Block info data:', data); // Debugging line
          setBlockInfo(data);

          if (data.opposite) {
            setOppositeInfo(data.opposite);
          }
        } else {
          console.error('Failed to fetch block info');
        }
      } catch (error) {
        console.error('Error fetching block info:', error);
      }
    }

    fetchBlockInfo();
  }, [block]);

  const getOppositeLink = () => {
    if (oppositeInfo) {
      return `/block/${oppositeInfo.tx_id}`;
    }
    return null;
  };

  const buttonText = blockInfo?.type === 'request' ? 'Check Response Info' : 'Check Request Info';

  return (
    <div className="block-info-page">
      <h1>{blockInfo?.type === 'request' ? 'Request Information' : 'Response Information'}</h1>
      {blockInfo ? (
        <div>
          <p><strong>TX ID:</strong> {blockInfo.tx_id}</p>
          <p><strong>Chain ID:</strong> {blockInfo.chain_id}</p>
          <p><strong>Address:</strong> {blockInfo.user_address}</p>
          <p><strong>Text:</strong> {blockInfo.text}</p>
          <p><strong>Timestamp:</strong> {blockInfo.timestamp}</p>
          {oppositeInfo ? (
            <div>
              <p><strong>Opposite Transaction:</strong></p>
              <Link href={getOppositeLink()}>
                <span className="button">{buttonText}</span>
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
        .block-info-page {
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

// Fetch block info server-side for initial render
export async function getServerSideProps(context) {
  const { id } = context.query;
  return { props: { block: id } };
}

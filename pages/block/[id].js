import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlockInfo({ block }) {
  const [blockInfo, setBlockInfo] = useState(null);

  useEffect(() => {
    async function fetchBlockInfo() {
      const res = await fetch(`/api/block/${block}`);
      if (res.ok) {
        const data = await res.json();
        setBlockInfo(data);
      }
    }

    fetchBlockInfo();
  }, [block]);

  return (
    <div className="block-info-page">
      <h1>Block Information</h1>
      {blockInfo ? (
        <div>
          <p><strong>TX ID:</strong> {blockInfo.tx_id}</p>
          <p><strong>Chain ID:</strong> {blockInfo.chain_id}</p>
          <p><strong>Address:</strong> {blockInfo.user_address}</p>
          <p><strong>Text:</strong> {blockInfo.text}</p>
          <p><strong>Timestamp:</strong> {blockInfo.timestamp}</p>
          {blockInfo.opposite ? (
            <div>
              <p><strong>Opposite Transaction:</strong></p>
              <Link href={`/block/${blockInfo.opposite.tx_id}`}>
                <a className="button">Check Opposite Block</a>
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
        a.button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
        a.button:hover {
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

import Link from 'next/link';

export default function ActivityColumn({ title, activities }) {
  return (
    <div className="activity-column">
      <h2>{title}</h2>
      {activities.map((activity, index) => (
        <div key={index} className="activity-item">
          <p><strong>Block:</strong> {activity.timestamp}</p>
          <p><strong>Address:</strong> {activity.user_address}</p>
          <p><strong>Request ID:</strong> {activity.req_id}</p>
          <p><strong>Tx ID:</strong>
            <Link href={`/block/${activity.tx_id}`} legacyBehavior>
              <a className="info-link">{activity.tx_id}</a>
            </Link>
          </p>
          <p className="activity-text"><strong>Text:</strong> {activity.text}</p>
        </div>
      ))}

      <style jsx>{`
        .activity-column {
          width: 50%;
          padding: 1rem;
        }
        .activity-item {
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .activity-text {
          font-size: 0.875rem; /* Adjust font size as needed */
          max-height: 4.5em; /* Limit height to 3 lines */
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .info-link {
          color: #0070f3;
          text-decoration: none;
          background: #f0f0f0;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .info-link:hover {
          background: #e0e0e0;
        }
      `}</style>
    </div>
  );
}

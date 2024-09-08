// pages/activity.js
// pages/activities.js
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, useCallback } from 'react';
import ActivityColumn from '../components/ActivityColumn';

export default function Activity() {
  const router = useRouter();
  const { address } = router.query;

  const [requestActivities, setRequestActivities] = useState([]);
  const [responseActivities, setResponseActivities] = useState([]);
  const [requestOffset, setRequestOffset] = useState(0);
  const [responseOffset, setResponseOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const observer = useRef();

  const fetchActivities = async (offset, type) => {
    try {
      setLoading(true);
      let url = `/api/activity/${type}?offset=${offset}`
      if (address !== "undefined" && address !== "" && address) {
        url += `&address=${address}`
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadMoreActivities = useCallback(async () => {
    if (!hasMore) return;

    const [newRequests, newResponses] = await Promise.all([
      fetchActivities(requestOffset, 'requests'),
      fetchActivities(responseOffset, 'responses'),
    ]);

    // Append new data to current list
    setRequestActivities((prev) => [...prev, ...newRequests]);
    setResponseActivities((prev) => [...prev, ...newResponses]);

    // Update the offsets for the next batch
    setRequestOffset((prev) => prev + newRequests.length);
    setResponseOffset((prev) => prev + newResponses.length);

    // Stop loading more if no new data is returned
    if (newRequests.length === 0 && newResponses.length === 0) {
      setHasMore(false);
    }
  }, [requestOffset, responseOffset, hasMore, address]);

  // Observer callback to trigger fetching more activities
  const lastActivityRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreActivities();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreActivities]
  );

  useEffect(() => {
    // Initial data fetch
    loadMoreActivities();
  }, [address]);

  if (loading && requestActivities.length === 0 && responseActivities.length === 0) {
    return <p>Loading activities...</p>;
  }

  if (error) {
    return <p>Error loading activities: {error}</p>;
  }

  return (
    <div className="activity-page">
      <h1>Activity</h1>
      <div className="columns">
        <ActivityColumn title="Requests" activities={requestActivities} />
        <ActivityColumn title="Responses" activities={responseActivities} />
      </div>
      {loading && <p>Loading more...</p>}
      <div ref={lastActivityRef} className="load-more"></div>

      <style jsx>{`
        .activity-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
        }
        .columns {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        .load-more {
          height: 20px;
        }
      `}</style>
    </div>
  );
}

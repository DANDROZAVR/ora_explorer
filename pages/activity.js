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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const observer = useRef();

  const fetchActivities = async (offset, type, address) => {// Verify function is called
    try {
      console.log(router.isReady)
      console.log('address: ', address)
      console.log(offset, type)
      let url = `/api/activity/${type}?offset=${offset}`;

      // Only add the address filter if it's present and valid
      if (address && address.length === 42) {
        url += `&address=${address}`;
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
    }
  };

  const loadMoreActivities = useCallback(async (address) => {
    if (!hasMore || loading) return;
    console.log('DOING LOADING')
    console.log(requestActivities)
    console.log(responseActivities)
    setLoading(true);
    const [newRequests, newResponses] = await Promise.all([
      fetchActivities(requestOffset, 'requests', address),
      fetchActivities(responseOffset, 'responses', address),
    ]);

    setRequestActivities((prev) => [...prev, ...newRequests]);
    setResponseActivities((prev) => [...prev, ...newResponses]);

    setRequestOffset((prev) => prev + newRequests.length);
    setResponseOffset((prev) => prev + newResponses.length);

    if (newRequests.length === 0 && newResponses.length === 0) {
      setHasMore(false);
    }
      setLoading(false);
  }, [requestOffset, responseOffset, hasMore, loading]);

  // Observer callback to trigger fetching more activities
  const lastActivityRef = useCallback(
    (node) => {
      console.log('load activity ref')
      console.log(loading)
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      console.log('going through')
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && router.isReady) {
          loadMoreActivities(address);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreActivities, router.isReady]
  );

  useEffect(() => {
    console.log('activity use effect')
    // Reset offsets and activities when address changes
    setRequestOffset(0);
    setResponseOffset(0);
    setRequestActivities([]);
    setResponseActivities([]);
    setHasMore(true);
  }, [router.isReady]); // Ensure it only runs when the router is ready and the address changes

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

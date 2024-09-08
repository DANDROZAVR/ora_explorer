// pages/search.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Search() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');

    // Check if the query length is 42 characters
    if (query.length === 42) {
      // Redirect to address page with query as address
      router.push(`/activity?address=${query}`);
    } else {
      // Check for transaction ID in requests and responses
      try {
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();

        if (data.found) {
          // Redirect to event page with transaction ID
          router.push(`/event/${query}`);
        } else {
          // Show error message
          setError("We've not found such a txn or address");
        }
      } catch (error) {
        setError('An error occurred while searching.');
      }
    }
  };

  return (
    <div className="search-page">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your address or request/response tx id"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <style jsx>{`
        .search-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: transparent; /* Make the background transparent */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000; /* Ensure it is on top of other elements */
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.8); /* Slightly opaque background for form */
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        input {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 1rem;
          width: 300px;
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
        .error-message {
          color: red;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

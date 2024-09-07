// pages/index.js
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="homepage">
      <Navbar />
      <h1>Welcome to AI Blockchain Explorer</h1>
      <p>This explorer lets you search, view recent activities, and explore AI-blockchain-related data.</p>

      <style jsx>{`
        .homepage {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-image: url('/background.jpg');
          background-size: cover;
          color: white;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
        }
        p {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}

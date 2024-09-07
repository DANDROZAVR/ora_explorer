// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/search">Search</Link></li>
        <li><Link href="/activity">Activity</Link></li>
      </ul>
      <style jsx>{`
        nav {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1000; /* Keep text on top of the background */
        }
        ul {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
        }
        li {
          margin: 0 1.5rem;
        }
        a {
          color: #000; /* Text color black */
          text-decoration: none;
          font-size: 1.5rem; /* Larger font size */
        }
        a:hover {
          color: #555; /* Darker color on hover */
        }
      `}</style>
    </nav>
  );
}

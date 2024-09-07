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
          background: #333;
          padding: 1rem;
        }
        ul {
          list-style: none;
          display: flex;
          justify-content: space-around;
        }
        li {
          margin: 0 1rem;
        }
        a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
}

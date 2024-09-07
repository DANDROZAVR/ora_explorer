// components/Layout.js
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <style jsx>{`
        main {
          padding-top: 4rem; /* Adjust according to the Navbar height */
        }
      `}</style>
    </>
  );
}

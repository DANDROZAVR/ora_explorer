// // pages/index.js
// import { useEffect, useState } from 'react';
// import { sql } from '@vercel/postgres';
//
// export default function Home() {
//   const [message, setMessage] = useState('Hello World');
//
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Simple query to test Postgres connection
//         const result = await sql`SELECT NOW()`;
//         console.log('Database response:', result);
//       } catch (error) {
//         console.error('Error connecting to Postgres:', error);
//       }
//     }
//     fetchData();
//   }, []);
//
//   return (
//     <div>
//       <h1>{message}</h1>
//       <p>Check the console for database response.</p>
//     </div>
//   );
// }

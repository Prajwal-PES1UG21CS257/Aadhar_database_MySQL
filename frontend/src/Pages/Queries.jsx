import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Queries = () => {
  const [selectedQuery, setSelectedQuery] = useState('');
  const [resultTable, setResultTable] = useState([]);

  // Define the MySQL queries
  const queries = [
    'SELECT * FROM family1;',
    'SELECT A.name, A.uid, A.gender, A.dob, B.relation, (SELECT C.name FROM aadhar_card C JOIN family1 D ON C.uid = D.uid_of_dependee WHERE D.uid_of_dependee = 50 LIMIT 1) AS Dependee FROM aadhar_card A JOIN Family1 B ON A.uid = B.uid_of_dependent WHERE B.uid_of_dependee = 50;',
    'SELECT centre_id, count(*) AS Appointments FROM enrolls GROUP BY centre_id;',
    'SELECT * FROM citizen;',
    'SELECT * FROM enrollment_centre',
    'SELECT * FROM aadhar_card',
    'SELECT * FROM operator'
    // Add more queries as needed
  ];

  // Function to execute the selected query
  const executeQuery = async () => {
    try {
      const response = await axios.post('http://localhost:3090/query', { query: selectedQuery });
      setResultTable(response.data);
    } catch (error) {
      console.error('Error executing query:', error);
    
    }
  };

  // Fetch the result when the component mounts
  useEffect(() => {
    if (selectedQuery) {
      executeQuery();
    }
  }, [selectedQuery]);

  return (
    <div>
      <h1>MySQL Query Executor</h1>
      <label>Select Query:</label>
      <select onChange={(e) => setSelectedQuery(e.target.value)}>
        <option value="">Select...</option>
        {queries.map((query, index) => (
          <option key={index} value={query}>
            {query}
          </option>
        ))}
      </select>

      <button onClick={executeQuery}>Execute Query</button>

      <h2>Result Table:</h2>
      <table>
        <thead>
          <tr>
            {/* Assuming the resultTable is an array of objects with column names */}
            {resultTable.length > 0 &&
              Object.keys(resultTable[0]).map((column, index) => (
                <th key={index}>{column}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {resultTable.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Queries

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Queries = () => {
//   const [selectedQuery, setSelectedQuery] = useState('');
//   const [resultTable, setResultTable] = useState([]);
//   const [uidOfDependent, setUidOfDependent] = useState('');

//   // Define the MySQL queries
//   const queries = [
//     'SELECT * FROM family1;',
//     'SELECT A.name, A.uid, A.gender, A.dob, B.relation, (SELECT C.name FROM aadhar_card C JOIN family1 D ON C.uid = D.uid_of_dependee WHERE D.uid_of_dependee = ? LIMIT 1) AS Dependee FROM aadhar_card A JOIN Family1 B ON A.uid = B.uid_of_dependent WHERE B.uid_of_dependee = ?;',
//     'SELECT centre_id, count(*) AS Appointments FROM enrolls GROUP BY centre_id;',
//     'SELECT * FROM citizen;',
//     'SELECT * FROM enrollment_centre',
//     'SELECT * FROM aadhar_card',
//     'SELECT * FROM operator'
//     // Add more queries as needed
//   ];

//   // Function to execute the selected query
//   const executeQuery = async () => {
//     try {
//       const response = await axios.post('http://localhost:3090/query', { query: selectedQuery, uidOfDependent });
//       setResultTable(response.data);
//     } catch (error) {
//       console.error('Error executing query:', error);
//     }
//   };

//   // Fetch the result when the component mounts
//   useEffect(() => {
//     if (selectedQuery) {
//       executeQuery();
//     }
//   }, [selectedQuery, uidOfDependent]);

//   return (
//     <div>
//       <h1>MySQL Query Executor</h1>
//       <label>Select Query:</label>
//       <select onChange={(e) => setSelectedQuery(e.target.value)}>
//         <option value="">Select...</option>
//         {queries.map((query, index) => (
//           <option key={index} value={query}>
//             {query}
//           </option>
//         ))}
//       </select>

//       {selectedQuery === queries[1] && (
//         <div>
//           <label>UID of Dependent:</label>
//           <input type="text" value={uidOfDependent} onChange={(e) => setUidOfDependent(e.target.value)} />
//         </div>
//       )}

//       <button onClick={executeQuery}>Execute Query</button>

//       <h2>Result Table:</h2>
//       <table>
//         <thead>
//           <tr>
//             {/* Assuming the resultTable is an array of objects with column names */}
//             {resultTable.length > 0 &&
//               Object.keys(resultTable[0]).map((column, index) => (
//                 <th key={index}>{column}</th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           {resultTable.map((row, index) => (
//             <tr key={index}>
//               {Object.values(row).map((value, colIndex) => (
//                 <td key={colIndex}>{value}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Queries;

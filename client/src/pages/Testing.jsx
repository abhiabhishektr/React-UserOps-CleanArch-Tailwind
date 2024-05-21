// import React, { useEffect, useState } from "react";

// const userURL='http://localhost:4000/api/users'

// function Testing() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(userURL);
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       {data ? (
//         <div>Data from backend: {data.hai}</div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// }

// export default Testing;





import React, { useState } from "react";

import axios from 'axios';
const userURL='http://localhost:4000/api/users'
function Testing() {
  const [dataToSend, setDataToSend] = useState("");
//   ----
  const [sibil, setSibil] = useState("");
  //   ----
  const [response, setResponse] = useState(null);


  const sendShibil = async () => {
    try {
      const response = await axios.post(`${userURL}/testShibil`, {
        data: sibil
      });
      setResponse(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

//   const sendShibil= async ()=>{
// const a=await fetch(`${userURL}/testShibil`,{
//     method:'POST',
//     headers:{
//         'Content-Type':'application/json'
//     },
//     body:JSON.stringify({data:sibil})
// })  
//     }


  return (
    <div>

<input type="text"
value={sibil}
onChange={(e) => setSibil(e.target.value)} />
<button onClick={sendShibil}>Send Data</button>

      {/* <input
        type="text"
        value={dataToSend}
        onChange={(e) => setDataToSend(e.target.value)}
      />
      <button onClick={sendDataToBackend}>Send Data</button>
      {response && <div>Response from backend: {response}</div>} */}
    </div>
  );
}

export default Testing;

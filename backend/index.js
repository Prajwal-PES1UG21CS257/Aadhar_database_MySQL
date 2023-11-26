const express = require('express');
const mysql = require('mysql');
const cors = require("cors");



const app = express();
app.use(express.json())
app.use(cors())



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'houRs#35',
  database: 'aadhaar'
});


app.get('/', (req, res) => {
  res.send('Welcome to the Aadhar Card Database Website!');
});


app.get("/data",(req, res)=>{
  const q = "SELECT * FROM aadhaar.aadhar_card;";
  db.query(q, (err, data)=>{
      if(err) return res.json(err)

      return res.json(data)
  });
});

app.get("/data/:id",(req, res)=>{

  // const bookId = parseInt(req.params.id, 10);
  // // console.log(bookId)
  // // const q = "call display_details(?);";

  // const q = "SELECT * FROM aadhaar.aadhar_card WHERE `uid` = ? ;";
  // db.query(q,[bookId], (err, data)=>{
  //     if(err) return res.json(err)

  //     return res.json(data)
  // });

  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
      // Handle the case where the conversion is not successfule
      return res.status(400).json({ error: 'Invalid bookId' });
  }

  // Rest of your code
  const q = "call display_details(?);";

  db.query(q, [bookId], (err, data) => {
      if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(data[0]);
  });
});

app.post("/data", (req, res) => {
  // Log the request body to see if data is coming through correctly
  console.log("Received data:", req.body);

  const query = "INSERT INTO aadhar_card(`uid`, `name`, `dob`, `address`, `gender`, `email`, `phno`, `biometric_data`, `poi_no`, `centre_id`) VALUES (?)";
  const q2 = "INSERT INTO family1(`uid_of_dependee`, `relation`, `uid_of_dependent`) VALUES(?)";
  const values = [
    req.body.uid,
    req.body.name,
    req.body.dob,
    req.body.address,
    req.body.gender,
    req.body.email,
    req.body.phno,
    req.body.biometric_data,
    req.body.poi_no,
    req.body.center_id
  ];
  
  const values1 = [
    req.body.uid_dependee,
    req.body.relation,
    req.body.uid
  ];

  // Log the values array to ensure it is structured correctly
  console.log("Inserting values:", values);

  db.query(query, [values], (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Error inserting data into the database", error: err });
    }
    
    console.log("First insert result:", data);

    // Now, execute the second query
    db.query(q2, [values1], (err, data) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Error inserting data into the database", error: err });
      }

      console.log("Second insert result:", data);
      return res.status(201).json({ message: "Data inserted successfully", data: data });
    });
  });
});



app.delete("/data/:id", (req, res)=>{
  const bookId = req.params.id;
  const q = "DELETE FROM aadhar_card WHERE `uid` = ?";

  db.query(q,[bookId], (err, data)=>{
      if(err) return res.json(err);
      return res.json("Successfully deleted");
  });
});


app.put("/data/:id", (req, res) => {
  console.log("Received data:", req.body);
  const bookId = req.params.id;

  const q = "UPDATE aadhar_card SET `uid` = ?, `name` = ?, `dob` = ?, `address` = ?, `gender` = ?, `email` = ?, `phno` = ?, `biometric_data` = ?, `poi_no` = ?, `centre_id` = ? WHERE `uid` = ?";
  const values = [
    req.body.uid,
    req.body.name,
    req.body.dob,
    req.body.address,
    req.body.gender,
    req.body.email,
    req.body.phno,
    req.body.biometric_data,
    req.body.poi_no,
    req.body.centre_id
  ];

  console.log("Updating record with UID:", bookId);
  console.log("Inserting values:", values);

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.error("Error updating record:", err);
      return res.status(500).json(err);
    }
    console.log("aadhar has been updated successfully");
    return res.json({ message: "aadhar has been updated successfully", affectedRows: data.affectedRows });
  });
});


app.put("/user/:id", (req, res) => {
  console.log("Received data:", req.body);
  const bookId = req.params.id;

  const q = "UPDATE aadhar_card SET  `address` = ? WHERE `uid` = ?";
  const values = [
    req.body.address,
  ];

  console.log("Updating record with UID:", bookId);
  console.log("Inserting values:", values);

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.error("Error updating record:", err);
      return res.status(500).json(err);
    }
    console.log("aadhar has been updated successfully");
    return res.json({ message: "aadhar has been updated successfully", affectedRows: data.affectedRows });
  });
});

app.get("/ecenters",(req, res)=>{
  const q = "SELECT * FROM enrollment_centre;";
  db.query(q, (err, data)=>{
      if(err) return res.json(err)

      return res.json(data)
  });
});

app.post("/enroll",(req, res)=>{

  console.log("Received data:", req.body);

  const query = "INSERT INTO enrolls(`poi_no`, `centre_id`) VALUES (?)";
  const values = [
    req.body.poi_no,
    req.body.centre_id
  ];

  // Log the values array to ensure it is structured correctly
  console.log("Inserting values:", values);

  db.query(query, [values], (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Error inserting data into the database", error: err });
    }
    console.log("Insert result:", data);
    return res.status(201).json({ message: "Data inserted successfully", data: data });
  });

})

app.get("/enroll",(req, res)=>{
  const q = "SELECT * FROM enrolls;";
  db.query(q, (err, data)=>{
      if(err) return res.json(err)

      return res.json(data)
  });
});


app.post('/query', (req, res) => {
  const query = req.body.query;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
    } else {
      res.json(result);
    }
  });
});

// app.post('/query', (req, res) => {
//   const query = req.body.query;
//   const uidOfDependent = req.body.uidOfDependent;

//   console.log(uidOfDependent)
//   console.log(query)

//   db.query(query, [uidOfDependent], (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Error executing query' });
//     } else {
//       res.json(result);
//     }
//   });
// });


app.listen(3090, () => {
    console.log('Server listening on port 3090');
});
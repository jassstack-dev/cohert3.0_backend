const express = require("express");

const app = express();
app.use(express.json());

let users = [];

// get
app.get("/", (req, res) => {
  res.send(users);
});



// create
app.post("/create", (req, res) => {
  const body = req.body;

  users.push(body);

  res.send(users);
});


// delete
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let deleteUser = users.filter((val) => val.id !== id);
  users = deleteUser;
  res.send(deleteUser);
});

// update
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  // console.log(body)

  const updateUser = users.map((val) =>
    val.id === id ? { ...val, name } : val,
  );
  console.log(updateUser);
  res.send("update successfully");
});

app.listen(3000, () => {
  console.log("server runnning on port 3000");
});

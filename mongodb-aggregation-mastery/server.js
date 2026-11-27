import matchOrder from "./src/01-basic-stages/match.js";
import app from "./src/app.js";
//connected database
import db from "./src/config/db.js";

//order inserted in the mongodb compass
import seedOrders from "./src/data/seed.js";

// match order 

try {

    db();

    seedOrders()

    matchOrder()




    app.listen(3000, () => {
  console.log("server running on the port 3000");
});
    
} catch (error) {
    
}


// app listen


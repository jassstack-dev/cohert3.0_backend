import mongoose from "mongoose";




const matchOrder = async () => {
  try {
 
    console.log("DB Connected:", mongoose.connection.readyState);
    console.log("Database:", mongoose.connection.name);

    const collection = mongoose.connection.collection("orders");

    const count = await collection.countDocuments();

    console.log("Total Orders:", count);

    const result = await collection
      .aggregate([
        {
          $match: {
            // __________________$IN___________
        //    status :{
        //     // $in:['pending', 'delivered'] // --> inme se koi ek and dono bhi ho skte ha

        //    }
        

        // ___________________$eq__________
        // amount :{
        //     $eq:2500
        // }

        // _________________

        


          }
        }
      ])
      .toArray();

    console.log("Aggregation Result:", result);
 

  } catch (error) {
    console.log("ERROR:", error);
  }
};

export default matchOrder
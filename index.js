const { MongoClient } = require("mongodb");

// connection string
const uri = "mongodb://localhost:27017";

// new MongoClient
const client = new MongoClient(uri);

// Function to connect to the database
async function setDatabaseConnection() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access DMDD database and lab1 cluster
    const database = client.db("DMDD");
    const collection = database.collection("lab1");

    const findTotalOrderSold = [
      {
        $match: {
          ProductID: 868,
        },
      },
      {
        $group: {
          _id: "$ProductID",
          totalSoldQuantity: {
            $sum: "$TotalOrderQuantity",
          },
        },
      },
    ];

    const totalSold = await collection.aggregate(findTotalOrderSold).toArray();

    if (totalSold.length > 0) {
      console.log(
        "Total sold quantity for ProductID 868 is",
        totalSold[0].totalSoldQuantity
      );
    } else {
      console.log("ProductID 868 has 0 sold quantity");
    }
  } catch (error) {
    console.error("Error connecting to the database", error);
  } finally {
    // Close the client connection when done
    await client.close();
  }
}

setDatabaseConnection();

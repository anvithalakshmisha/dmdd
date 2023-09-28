const { MongoClient } = require("mongodb");

// MongoDB Atlas connection string. Replace with your own connection string.
const uri = "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to connect to the database
async function connectToDatabase() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access a specific database
    const database = client.db("DMDD");
    const collection = database.collection("lab1");

    console.log("Connected to the database");

    // You can perform database operations here

    const pipeline = [
      {
        $match: {
          ProductID: 868, // Match documents with ProductID 868
        },
      },
      {
        $group: {
          _id: null,
          totalSoldQuantity: {
            $sum: "$TotalOrderQuantity", // Calculate the sum of TotalOrderQuantity
          },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    if (result.length > 0) {
      console.log(
        "Total sold quantity for Product 868:",
        result[0].totalSoldQuantity
      );
    } else {
      console.log("Product 868 not found in orders.");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    // Close the client connection when done
    await client.close();
  }
}

// Call the connectToDatabase function to establish a connection
connectToDatabase();

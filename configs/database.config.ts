import mongoose from "mongoose"

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connect success.");
  } catch {
    console.log("Connect error.");
  }
}

export default connect;
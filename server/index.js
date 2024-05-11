const dotenv = require("dotenv")
const cors = require("cors")
const express = require("express")

const cookieParser  = require("cookie-parser")
const dbConnect = require("./utils/dbConnect")
const userRouter = require("./routes/userRouter")
const taskRouter = require("./routes/taskRouter");

const app = express()
dotenv.config();
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({
      message:"hello from the server"
    })
})

app.use("/api/v1", userRouter);
app.use("/api/tasks",taskRouter);


const port = process.env.PORT || 2000
app.listen(port, async () => {
    try {
        await dbConnect();
        console.log('server is runnig on port ', port);
    } catch (error) {

    }
})
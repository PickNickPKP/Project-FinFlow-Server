import dotenv from "dotenv";
import app from "./app.js"
import shutdown from './utils/shutdown.util.js'

dotenv.config();

const PORT = process.env.PORT || 8888

app.listen(PORT, ()=>console.log(`Server is running ${PORT}`))


process.on("SIGINT", ()=>	shutdown('SIGINT'))
process.on("SIGTERM", ()=>	shutdown('SIGTERM'))

process.on("uncaughtException", ()=>	shutdown('uncaughtException'))
process.on("unhandledRejection", ()=>	shutdown('unhandledRejection'))

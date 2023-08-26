import app from "./app";
import startDatabase from "./database/connection";

const PORT = process.env.PORT
app.listen(PORT, async ()=>{
    await startDatabase()
    console.log(`App running on port ${PORT}`);
})
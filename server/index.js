import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/router.js';

dotenv.config();
const PORT = process.env.PORT //|| 5000
const DB_URL = process.env.DB_URL

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', router)


async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true },
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('good');
                }
            })
        app.listen(PORT, () => console.log("server working " + PORT))
    } catch (e) {
        console.log(e)
    }
}


startApp();

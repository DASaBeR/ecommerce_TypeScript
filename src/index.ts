import express from 'express'
import type { Express } from 'express';
import { PORT } from './secrets';
import rootRouter from './routes/index';

const app:Express = express();

app.use('/api' ,rootRouter)

app.listen(PORT, () => {
    console.log("App running on port :", PORT);
    
})
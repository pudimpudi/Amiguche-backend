import express from 'express';
import 'dotenv/config'

const server=express();
server.use(express.json());

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`O server está rodadndo na porta ${PORT}`);
})

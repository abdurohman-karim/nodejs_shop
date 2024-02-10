import express from 'express';

const app = express();

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

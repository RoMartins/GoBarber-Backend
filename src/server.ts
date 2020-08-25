import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (resquest, response) => {
  return response.json({ message: 'Hello' });
});

app.listen(3333, () => {
  console.log('🚀 Server running on port 3333!');
});

const express = require('express');
const cors = require('cors');
const app = express();

const counter = (() => {
  let count = 0;
  
  const increment = () => {
    count++;
  };

  const decrement = () => {
    count--;
  };

  const getCount = () => {
    return count;
  };

  return {
    increment,
    decrement,
    getCount,
  };
})();

app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/increment', (req, res) => {
  counter.increment();
  res.json({ count: counter.getCount() });
});

app.get('/decrement', (req, res) => {
  counter.decrement();
  res.json({ count: counter.getCount() });
});

global.counter = counter;

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App listening at http://localhost:${port}`);
});

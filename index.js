// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');

// const authRouter = require('./routers/authRouter');
// const postsRouter = require('./routers/postsRouter');

// const app = express();
// app.use(cors());
// app.use(helmet());
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose
// 	.connect(process.env.MONGO_URI)
// 	.then(() => {
// 		console.log('Database connected');
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

// app.use('/api/auth', authRouter);
// app.use('/api/posts', postsRouter);
// app.get('/', (req, res) => {
// 	res.json({ message: 'Hello from the server' });
// });

// app.listen(process.env.PORT, () => {
// 	console.log('listening...');
// });





// require('dotenv').config(); 
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter')
const postsRouter = require('./routers/postsRouter')

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true,  // Allow cookies to be sent
};


// Use middlewares
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log Mongo URI for debugging
// console.log('Mongo URI:', process.env.MONGO_URI);

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI is undefined. Please check your .env file.');
  process.exit(1);  // Exit if the URI is undefined
}

mongoose.connect(uri)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log(`Connection lost: ${err.message}`);
  });

  app.use('/api/auth',authRouter)
  app.use('/api/posts',postsRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server' });
});

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookie());

const topNewsRoutes = require('./routes/topnews.routes');
const newsCatRoutes = require('./routes/newscat.routes');
const searchRoutes = require('./routes/search.routes');
const loginRoutes = require('./routes/auth.routes');
const isLoginRoutes = require('./routes/isLogin.routes');
const aiSumRoutes = require('./routes/aiSum.routes');

app.use('/api', topNewsRoutes);
app.use('/api', newsCatRoutes);
app.use('/api', searchRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/auth', isLoginRoutes);
app.use('/api/', aiSumRoutes);

module.exports = app;
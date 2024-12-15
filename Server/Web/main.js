const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));
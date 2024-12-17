require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/router');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(helmet());
app.use(cors());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.'
});
app.use(limiter);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);
app.use('/', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 오류가 발생했습니다.' });
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다.');

  socket.on('chat_message', (msg) => {
    console.log('받은 메시지: ', msg);
    io.emit('chat_message', msg);
  });

  socket.on('disconnect', () => {
    console.log('사용자가 연결을 종료했습니다.');
  });
});

server.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
  console.log(`환경: ${ENV}`);
});

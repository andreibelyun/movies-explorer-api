const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // единица времени - 15 минут
  max: 100, // максимальное число запросов с одного IP в единицу времени
  message: { message: 'Вы превысили ограничение в 100 запросов за 15 минут' }, // создать ошибку 429 TooManyRequestsError!
  standardHeaders: true, // включает отображение ограничений в заголовках `RateLimit-*`
  legacyHeaders: false, // выключает устаревшие заголовки
});

exports.limiter = limiter;

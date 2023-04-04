const CORS_WHITELIST = [
  'http://localhost:3001',
  'https://localhost:3001',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://Katsuroproject15.nomoredomains.work',
  'https://Katsuroproject15.nomoredomains.work',
  'http://katsuroproject15.nomoredomains.work',
  'https://katsuroproject15.nomoredomains.work',
  'http://Katsuroprojectbackend15.nomoredomains.work',
  'https://Katsuroprojectbackend15.nomoredomains.work',
  'http://katsuroprojectbackend15.nomoredomains.work',
  'https://katsuroprojectbackend15.nomoredomains.work',
];

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOption;

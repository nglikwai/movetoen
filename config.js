const corConfig = {
  origin: [
    "http://127.0.0.1:5500",
    "https://movetoen.com",
    "https://api.dse00.com:80",
    "http://localhost:5500",
    "http://localhost:3003",
    "https://api.dse00.com:3003",
  ],
  methods: "GET,PUT,POST,DELETE", // Specify the allowed HTTP methods
  credentials: true,
};

module.exports = corConfig;

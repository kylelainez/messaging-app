const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const db = mongoose.connection;
console.log(process.env.DATABASE_URL)
db.on('connected', function () {
	console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

const fs = require('fs');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

const SERVER_URL = 'http://deploy.wacdn.com/static-pack';

module.exports = function (opts) {
	const formData = Object.assign({}, opts, {
		pack: fs.createReadStream(opts.filename)
	});

	// fix formData 对 boolean 支持
	Object.keys(formData).forEach((key) => {
		const val = formData[key];
		if (typeof val === 'boolean') {
			formData[key] = String(val);
		}
	});

	return request({
		method: 'POST',
		json: true,
		gzip: true,
		formData: formData,
		url: opts.__URL__ || SERVER_URL
	}).then((res) => {
		return res.body;
	});
};

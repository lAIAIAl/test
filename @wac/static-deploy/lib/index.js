const path = require('path');
const fs = require('fs-extra');
const targz = require('tar.gz');
const Promise = require('bluebird');
const promisify = Promise.promisify;

const glob = promisify(require('glob'));
const copy = promisify(fs.copy);
const remove = promisify(fs.remove);
const send = require('./send');

const cwd = process.cwd();

const defaults = {
	// 上传空间 可选 wacdn-test, wacdn-file, h5-page, sites...
	namespace: 'wacdn-file',

	// 环境, test 环境对应 namespace 为 wacdn-test
	// 其他设置 namespace 均设为 wacdn-file, 建议只设置 namespace
	env: '',

	// url 路径, => path.join(group, project)
	path: '',

	// 项目组
	group: '',

	// 项目名称
	project: '',

	// 本地上传目录
	cwd: cwd,

	// 需上传文件 glob 规则
	files: '**/*',

	// 是否启用图片压缩
	imagemin: false,

	// 需要刷新 url 列表
	urls: [],

	// 上传成功后不清除临时目录
	debug: false,

	// 资源上传接口, 用于覆盖默认 url
	// fallback 或 debug 使用
	__URL__: ''
};

/**
 * 发送项目静态资源到 cdn 同步服务器
 * @param  {Object} opts
 * @return {Promise}
 */
module.exports = function (opts) {
	opts = Object.assign({}, defaults, opts);

	const packDir = path.resolve(opts.cwd);
	const tarDir = path.join(cwd, Date.now() + '');
	const tarTgz = tarDir + '.tgz';

	opts.filename = tarTgz;

	return glob(opts.files, {
		nodir: true,
		cwd: packDir
	}).then((files) => {
		// 收集需要上传文件
		return Promise.map(files, (filePath) => {
			const srcPath = path.join(packDir, filePath);
			const distPath = path.join(tarDir, filePath);
			return copy(srcPath, distPath);
		});
	}).then(() => {
		// 压缩成 tgz 包
		return targz({}, {
			fromBase: true
		}).compress(tarDir, tarTgz);
	}).then(() => {
		return send(opts);
	}).catch((err) => {
		return {
			code: 1,
			error: err.stack || err
		};
	}).finally(() => {
		// 清理临时文件
		if (!opts.debug) {
			return Promise.all([
				remove(tarDir),
				remove(tarTgz)
			]);
		}
	});
};

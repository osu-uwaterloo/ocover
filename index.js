import express from 'express';
import NodeCache from 'node-cache';
import * as api from './api.js';

const cacheControl = new NodeCache({ stdTTL: 86400, checkperiod: 600, deleteOnExpire: false });
const app = express();

app.get('/:name', async function (req, res) {
	res.set({
		'Content-Type': 'image/png',
		'Cache-Control': 'public, max-age=86400',
	});
	let username = req.params.name ?? '';

	let userData, coverUrl;
	let cacheKey = username;

	if (req.headers['cache-control'] != 'no-cache' && cacheControl.has(cacheKey)) {
		({ coverUrl } = cacheControl.get(cacheKey));
		if (cacheControl.ttl(cacheKey) < 3600) {
			api.getUser(username).then((data) => {
				if (!data.error) {
					cacheControl.set(cacheKey, { coverUrl: data.user.cover_url });
				}
			});
		}
	} else {
		userData = await api.getUser(username);
		if (userData.error) {
			res.set('Content-Type', 'text/plain');
			res.send('Error: ' + userData.error);
			return;
		}
		coverUrl = userData.user.cover_url;
		cacheControl.set(cacheKey, { coverUrl });
	}
	res.redirect(302, coverUrl);
});

app.listen(process.env.PORT || 3000);

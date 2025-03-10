import express from 'express';

const app = express();

app.get('/:seg', async function (req, res) {
	res.set({
		'Content-Type': 'image/svg+xml',
	});
	const seg = req.params.seg.padEnd(7, '0');
	const bits = seg.split('').map(c => c === '1' ? 1 : 0);
	res.send(`
		<?xml version="1.0" encoding="UTF-8"?>
		<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.21 379.97">
			<style>
				.active {
				fill: #f00;
				}
			</style>
			<polygon class="${bits[6] ? 'active' : ''}" data-name="7" points="181.24 362.48 164.02 379.97 43.19 379.97 25.97 362.48 43.19 345.26 164.02 345.26 181.24 362.48" stroke-width="0"/>
			<polygon class="${bits[5] ? 'active' : ''}" data-name="6" points="207.21 215.95 207.21 336.78 189.99 354 172.76 336.78 172.76 215.95 189.99 198.73 207.21 215.95" stroke-width="0"/>
			<polygon class="${bits[4] ? 'active' : ''}" data-name="5" points="34.45 215.95 34.45 336.78 17.22 354 0 336.78 0 215.95 17.22 198.73 34.45 215.95" stroke-width="0"/>
			<polygon class="${bits[3] ? 'active' : ''}" data-name="4" points="181.24 189.85 164.02 207.34 43.19 207.34 25.97 189.85 43.19 172.63 164.02 172.63 181.24 189.85" stroke-width="0"/>
			<polygon class="${bits[2] ? 'active' : ''}" data-name="3" points="207.21 43.19 207.21 164.02 189.99 181.24 172.76 164.02 172.76 43.19 189.99 25.97 207.21 43.19" stroke-width="0"/>
			<polygon class="${bits[1] ? 'active' : ''}" data-name="2" points="34.45 43.19 34.45 164.02 17.22 181.24 0 164.02 0 43.19 17.22 25.97 34.45 43.19" stroke-width="0"/>
			<polygon class="${bits[0] ? 'active' : ''}" data-name="1" points="181.24 17.22 164.02 34.71 43.19 34.71 25.97 17.22 43.19 0 164.02 0 181.24 17.22" stroke-width="0"/>
		</svg>
	`.trim());
});

app.listen(process.env.PORT || 3000);

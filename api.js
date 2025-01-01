import got from 'got';
import cheerio from 'cheerio';

export const getUser = async (username) => {
	let response;
	try {
		response = await got({
			method: 'get',
			url: `https://osu.ppy.sh/users/${username}/`,
		});	
	} catch (error) {
		if (error.response.statusCode === 404){
			return {
				error: `User ${username} not found`
			}
		}
		return {
			error: `Unknown Error`
		}
	}
	
    const body = response.body;
	let $ = cheerio.load(body);
	let data = JSON.parse($('.js-react--profile-page').attr('data-initial-data'));

	return data;
}
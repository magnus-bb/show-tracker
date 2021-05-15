const querystring = require('querystring')

// Returns the JSON response of a GET request to the given api
async function getJson(reqUrl) {
	let content
	try {
		res = await fetch(reqUrl)
		content = await res.json()
	} catch (err) {
		throw new Error('Could not fetch: ' + reqUrl)
	}

	return content
}

// Use getJson to return a show, season or episode from OMDB by IMDB ID
async function omdbGet({ imdbId, seasonNum, title }) {
	const omdbBaseUrl = process.env.OMDB_API_URL
	const apiKey = process.env.OMDB_API_KEY

	// seasonNum is ignored if not passed
	const queryParams = {
		apiKey,
		i: imdbId,
		t: title,
		season: seasonNum,
	}

	const reqUrl = urlSerializer(omdbBaseUrl, queryParams)

	const res = await getJson(reqUrl)

	// Only when creating show object are we using title
	if (title && res.Type !== 'series') {
		throw new Error('Cannot find show on OMDB: ' + title)
	}

	if (res.Response === 'False') {
		throw new Error(
			'Cannot find resource on OMDB: ' + imdbId + ' - ' + seasonNum
				? 'Season: ' + seasonNum
				: ''
		)
	}

	return res
}

// Finds a show on tvm by imdbId and returns the tvm href of next airing episode
async function tvmGetNextEpHref(imdbId) {
	const tvmBaseUrl = process.env.TVMAZE_API_URL

	const baseUrl = tvmBaseUrl + '/lookup/shows'

	const queryParams = {
		imdb: imdbId,
	}

	const reqUrl = urlSerializer(baseUrl, queryParams)

	const res = await getJson(reqUrl)

	if (!res) {
		throw new Error(
			'There was an error finding the next air date for: ' + imdbId
		)
		return
	}

	if (!res._links.nextepisode) {
		console.log('There is no next airing episode for IMDB: ' + imdbId)
		return
	}

	return res._links.nextepisode.href
}

//* UTILS
function urlSerializer(baseUrl, params) {
	const queryParams = querystring.stringify(params)
	return baseUrl + '?' + queryParams
}

module.exports = {
	getJson,
	omdbGet,
	tvmGetNextEpHref,
}

// const testUrl = process.env.TVMAZE_API_URL + '/lookup/shows?imdb=tt8712204'
// console.log(await getJson(testUrl))

// console.log(omdbGetSeason('123&this'))
// console.log(urlSerializer('http://google.com', { hello: 'alright', this: 1337 }))
// console.log(await omdbGet({ imdbId: 'tt8712204' }))
// console.log(await tvmGetEpisode(await tvmGetNextEpHref('tt8712204')))

// console.log(await tvmGetShow("batwoman"))
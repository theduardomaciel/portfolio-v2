const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

const NOW_PLAYING_ENDPOINT =
	"https://api.spotify.com/v1/me/player/currently-playing";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getAccessToken = async () => {
	const basic = Buffer.from(
		`${import.meta.env.SPOTIFY_CLIENT_ID}:${
			import.meta.env.SPOTIFY_CLIENT_SECRET
		}`,
		"utf8",
	).toString("base64");

	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refresh_token as string,
		}),
	});

	return response.json();
};

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken();

	try {
		const response = await fetch(NOW_PLAYING_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getTopTracks = async () => {
	const { access_token } = await getAccessToken();

	try {
		const response = fetch(TOP_TRACKS_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response;
	} catch (error) {
		console.error(error);
		return null;
	}
};

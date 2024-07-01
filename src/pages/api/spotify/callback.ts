import type { APIRoute } from "astro";
import axios from "axios";

export const GET: APIRoute = async ({ request, redirect }) => {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);
	const code = params.get("code");

	const AUTHORIZATION_STRING = `Basic ${Buffer.from(
		`${import.meta.env.SPOTIFY_CLIENT_ID}:${
			import.meta.env.SPOTIFY_CLIENT_SECRET
		}`,
		"utf8",
	).toString("base64")}`;

	try {
		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				grant_type: "authorization_code",
				code: code as string,
				redirect_uri: "http://localhost:4321/api/spotify/callback",
			}),
			{
				headers: {
					Authorization: AUTHORIZATION_STRING,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		const { access_token, refresh_token } = response.data;
		return new Response(JSON.stringify({ access_token, refresh_token }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response("Error", {
			status: 500,
		});
	}
};

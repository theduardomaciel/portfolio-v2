import type { APIRoute } from "astro";

const URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
	import.meta.env.SPOTIFY_CLIENT_ID
}&state=meninocoiso&scope=user-read-private%20user-read-playback-state%20user-read-email&redirect_uri=http://localhost:4321/api/spotify/callback`;

export const GET: APIRoute = async ({ request, redirect }) => {
	return redirect(URL, 307);
};

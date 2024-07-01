import type { APIRoute } from "astro";

const webHookUrl = import.meta.env.DISCORD_WEBHOOK;

export default async function postEmail(email: string) {
    const content = JSON.stringify({ content: email });
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: content,
    };
    console.log(content, webHookUrl, requestOptions);
    try {
        const response = await fetch(webHookUrl, requestOptions);
        const data = await response.json();
        if (data) {
            console.log(
                "O e-mail foi enviado com sucesso para o Discord!",
                data
            );
            return true;
        }
            console.log("Não foi possível enviar o e-mail de contato :(");
            return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { email } = body;

    if (!email) {
        return new Response("No email provided", {
            status: 400,
        });
    }

    try {
        const updatedGuest = await postEmail(email);
        return new Response(null, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", {
            status: 500,
        });
    }
};

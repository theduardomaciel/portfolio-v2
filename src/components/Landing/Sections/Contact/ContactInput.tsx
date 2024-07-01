import type React from "react";
import { useState } from "react";
import "@/styles/contact.css";

// Functions
import axios from "axios";

import { useTranslations } from "@/i18n/utils";
import type { translations } from "@/i18n/utils";

const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		);
};

interface Props {
	lang?: string;
}

interface Status {
	placeholder: string;
	style: {
		border: string;
	};
	"data-state"?: string;
	disabled?: boolean;
}

export default function ContactInput({ lang }: Props) {
	const t = useTranslations(lang as keyof typeof translations).contact;

	const [status, setStatus] = useState<Status>({
		placeholder: t.input.placeholder.email,
		style: {
			border: "1px solid var(--secondary-01)",
		},
		"data-state": "idle",
	});

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const userEmail = formData.get("email") as string;

		const isEmailValid = validateEmail(userEmail);
		event.currentTarget.reset();

		if (!isEmailValid) {
			setStatus({
				placeholder: t.input.placeholder.valid_email,
				style: {
					border: "2px solid rgb(255, 0, 0)",
				},
			});
			setTimeout(() => {
				setStatus({
					placeholder: t.input.placeholder.email,
					style: {
						border: "1px solid var(--secondary-01)",
					},
				});
			}, 1750);
		} else {
			try {
				setStatus({
					placeholder: t.input.placeholder.pending,
					disabled: true,
					style: {
						border: "1px solid var(--purple)",
					},
					"data-state": "loading",
				});
				const response = await axios.post("/api/contact", {
					email: userEmail,
				});
				if (response.status === 200) {
					window.location.href = `${lang}/contact/success`;
				} else {
					window.location.href = `${lang}/contact/error`;
				}
			} catch (error) {
				console.log(error);
				window.location.href = `${lang}/contact/error`;
			}
		}
	}

	return (
		<form className="inputHolder" onSubmit={handleSubmit}>
			<input
				className={"input"}
				type="email"
				name="email"
				data-state="idle"
				{...status}
			/>
			<button
				type="submit"
				disabled={status.disabled === true}
				style={{ cursor: status.disabled ? "not-allowed" : "pointer" }}
			>
				{status["data-state"] === "loading" ? (
					<div className="loader" />
				) : (
					t.button
				)}
			</button>
		</form>
	);
}

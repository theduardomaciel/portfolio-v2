import {
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectGroup,
	SelectScrollUp,
	SelectScrollDown,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Select";

import LanguageIcon from "@/icons/language.svg?react";

import { defaultLang, translations, useTranslations } from "@/i18n/utils";

interface Props {
	lang?: string;
}

export default function LanguagePicker({ lang }: Props) {
	const t = useTranslations(lang as keyof typeof translations).footer.locale;

	return (
		<Select
			defaultValue={defaultLang}
			value={lang}
			onValueChange={(value) => {
				console.log(value);
				window.location.replace(
					window.location.pathname.replace(lang as string, value as string),
				);
			}}
		>
			<SelectTrigger id="languageSwitch" className="border-0">
				<LanguageIcon
					className={"interactiveIcon"}
					fill="var(--primary-01)"
					id={"languageIcon"}
					width={20}
					height={20}
					aria-label="Language change button"
				/>
				<SelectValue placeholder={t.title} />
			</SelectTrigger>
			<SelectContent>
				<SelectScrollUp />
				<SelectGroup>
					<SelectLabel>{t.title}</SelectLabel>
					{Object.keys(translations).map((locale) => (
						<SelectItem key={locale} value={locale}>
							{t.languages[locale as keyof typeof t.languages]}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectScrollDown />
			</SelectContent>
		</Select>
	);
}

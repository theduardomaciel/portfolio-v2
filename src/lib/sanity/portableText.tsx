import { portableTextToHtml } from "astro-sanity";
import getSanityImageURL from "./getSanityImageUrl";

interface ImageValue {
	asset: {
		_ref: string;
		_type: string;
	};
	alt: string;
}

interface BlockCommentValue {
	comment: string;
}

interface CodeBlockValue {
	code: string;
	language: string;
}

interface LinkValue {
	blank: boolean;
	href: string;
}

const customComponents = {
	types: {
		mainImage: ({ value }: { value: ImageValue }) => {
			return `
        <picture>
          <source
            srcset="${getSanityImageURL(value.asset).format("webp").url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${getSanityImageURL(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `;
		},
		image: ({ value }: { value: ImageValue }) => {
			return `
        <picture>
          <source
            srcset="${getSanityImageURL(value.asset).format("webp").url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${getSanityImageURL(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `;
		},
		blockComment: ({ value }: { value: BlockCommentValue }) => {
			return `
        <div class="block-comment">
            <p>${value.comment}</p>
        </div>
        `;
		},
		code: ({ value }: { value: CodeBlockValue }) => {
			return `<code-block code='${value.code}' language='${value.language}'></code-block>`;
		},
	},
	marks: {
		highlight: ({ children }: { children: React.ReactNode }) => {
			return `<mark>${children}</mark>`;
		},
		internalLink: ({ children }: { children: React.ReactNode }) => {
			/* console.log(props)
            const href = `/blog/${slug.current}` */
			return <p /* href={""} */> {children}</p>;
		},
		link: ({
			value,
			children,
		}: { value: LinkValue; children: React.ReactNode }) => {
			return value.blank
				? `<a href=${value.href} target="_blank" rel="noopener noreferrer">${children}</a>`
				: `<a href=${value.href}>${children}</a>`;
		},
	},
	block: {
		blockComment: ({ value }: { value: BlockCommentValue }) => {
			return `
        <div class="block-comment">
            <p>${value.comment}</p>
        </div>
        `;
		},
	},
};

export default function sanity(portableText: string) {
	return portableTextToHtml(portableText, customComponents);
}

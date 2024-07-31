import axios from "axios";
import { useRef, useState } from "react";

// Styles
import styles from "./buttons.module.css";

import BookmarkFilled from "@/icons/bookmark_filled.svg?react";
import BookmarkOutlined from "@/icons/bookmark.svg?react";

// Types
import type { Guest } from "@prisma/client";
import type { SanityPost } from "src/types/post";

interface Props {
	post: SanityPost;
	guest: Guest;
	initialValue?: boolean;
}

async function toggleLike(guest: Props["guest"], post: Props["post"]) {
	const response = await axios.patch(
		`/api/post/${post.slug.current}/bookmarks`,
		{ guestId: guest.id },
	);
	console.log(response.data);
}

export default function BookmarkButton({ guest, post, initialValue }: Props) {
	const [isActive, setActive] = useState(initialValue);
	const debouncing = useRef(false);

	return (
		<button
			type="button"
			className={`button modern ${styles.button} ${isActive ? `${styles.active} selected` : ""
				}`}
			style={{ width: "100%", paddingInline: "0px" }}
			onClick={() => {
				setActive(!isActive);
				if (debouncing.current === false) {
					debouncing.current = true;
					setTimeout(() => {
						toggleLike(guest, post);
						debouncing.current = false;
					}, 2000);
				}
			}}
		>
			<BookmarkFilled className={styles.filled} />
			<BookmarkOutlined className={styles.outlined} />
		</button>
	);
}

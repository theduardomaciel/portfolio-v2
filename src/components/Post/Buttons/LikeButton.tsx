import { useRef, useState } from "react";
import styles from "./buttons.module.css";

// Icons
import LikeFilled from "@/icons/like_filled.svg?react";
import LikeOutlined from "@/icons/like.svg?react";

import axios from "axios";

// Types
import type { Guest } from "@prisma/client";
import type { SanityPost } from "src/types/post";

interface Props {
	post: SanityPost;
	guest: Guest;
	initialValue?: boolean;
}

async function toggleLike(guest: Guest, post: Props["post"]) {
	const response = await axios.patch(`/api/post/${post.slug.current}/likes`, {
		guestId: guest.id,
	});
	console.log(response.data);
}

export default function LikeButton({ guest, post, initialValue }: Props) {
	const [isActive, setActive] = useState(initialValue);
	const debouncing = useRef(false);

	return (
		<button
			type="button"
			className={`button modern ${styles.button} ${isActive ? `${styles.active} selected` : ""
				}`}
			style={{ width: "100%", paddingInline: "0px" }}
			onClick={async () => {
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
			<LikeFilled className={styles.filled} />
			<LikeOutlined className={styles.outlined} />
		</button>
	);
}

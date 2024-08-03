import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import type { MotionProps } from "framer-motion";

import styles from "@/styles/projects.module.css";

// Icons
import FigmaIcon from "@/icons/figma.svg?react";
import DownArrow from "@/icons/down_arrow.svg?react";

// Status Icons
import FinishedIcon from "@/icons/ok.svg?react";
import PendingIcon from "@/icons/pending.svg?react";
import UnfinishedIcon from "@/icons/warning.svg?react";
import ArchivedIcon from "@/icons/archived.svg?react";
import SketchIcon from "@/icons/sketch.svg?react";
import PauseIcon from "@/icons/pause.svg?react";

// Types
import { useLayoutEffect, type Dispatch, type ReactEventHandler, type SetStateAction } from "react";
import type { Project } from "src/types/project";
import type React from "react";

// i18n
import type { translations } from "@/i18n/utils";
import { useTranslations } from "@/i18n/utils";

interface Props {
	children?: React.ReactNode;
	projects: Project[];
	lang?: string;
	pagination: [number, number];
	paginate: (newDirection: number) => void;
	setMoreInfoExpanded: Dispatch<SetStateAction<boolean>>;
	isMoreInfoExpanded: boolean;
}

const column1Props = {
	initial: { opacity: 0, x: "-100vw" },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: "-100vw" },
	transition: {
		type: "spring",
		stiffness: 100,
		damping: 20,
		duration: 1,
		ease: "easeOut",
	},
} as MotionProps;

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 100 : -100,
			opacity: 0
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 100 : -100,
			opacity: 0
		};
	}
};

const staticColumn2Props = {
	variants: variants,
	initial: "enter",
	animate: "center",
	exit: "exit",
	transition: {
		x: { type: "spring", stiffness: 300, damping: 50 },
		opacity: { duration: 0.45 },
		delay: 1,
	},
	drag: "x",
	dragConstraints: { left: 0, right: 0 },
	dragElastic: 1,
} as MotionProps;

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 * @author @framer
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

const status_info = {
	COMPLETED: <FinishedIcon />,
	SKETCH: <SketchIcon />,
	WORK_IN_PROGRESS: <PendingIcon />,
	PAUSED: <PauseIcon />,
	ARCHIVED: <ArchivedIcon />,
	OUTDATED: <UnfinishedIcon />,
};

export default function ProjectsCarousel({
	children,
	projects,
	lang,
	pagination: [projectIndex, direction],
	paginate,
	setMoreInfoExpanded,
	isMoreInfoExpanded,
}: Props) {
	const column2Props = {
		...staticColumn2Props,
		custom: direction,
		onDragEnd: (e, { offset, velocity }) => {
			const swipe = swipePower(offset.x, velocity.x);

			if (swipe < -swipeConfidenceThreshold) {
				paginate(1);
			} else if (swipe > swipeConfidenceThreshold) {
				paginate(-1);
			}
		},
	} as MotionProps;

	const projectStatusString = Object.keys(status_info).filter(
		(status) => status === projects[projectIndex].status,
	)[0];

	const projectStatusIcon =
		status_info[projects[projectIndex].status as keyof typeof status_info];

	const t = useTranslations(lang as keyof typeof translations).projects
		.carousel;

	const descriptions = projects.map((project) => {
		return (
			<m.div
				key={`description_${project.id}`}
				className={styles.info}
				{...column1Props}
			>
				<div
					style={{
						background: `linear-gradient(90deg, rgba(${project.accent_color}, 0.65) 0%, rgba(${project.accent_color}, 0.25) 57.29%, rgba(${project.accent_color}, 0) 100%)`,
					}}
					className={styles.headerDecoration}
				/>
				<div className={styles.infoHeader}>
					<div
						className={
							styles.statusHolder
						} /* {...popTransitionProps} */
					>
						{projectStatusIcon}
						<div className={styles.separator} />
						<p>
							{
								t.status[
								projectStatusString as keyof typeof t.status
								]
							}
						</p>
						{project.year && (
							<>
								<div className={styles.dot} />
								<p>
									{project.status === "WORK_IN_PROGRESS" &&
										t.since}{" "}
									{project.year}
								</p>
							</>
						)}
					</div>
					<h3>{project.name || project.id}</h3>
					<h4>{project.description}</h4>
				</div>
				<div
					key={`$info_${project.id}`}
					className={styles.buttonColumn} /* {...popTransitionProps} */
				>
					<div className={styles.buttonRow}>
						{project.project_url && (
							<a
								target={"_blank"}
								rel="noreferrer"
								href={project.project_url}
							>
								<button
									type="button"
									className="button inverted modern outline disabled"
									style={{
										backgroundColor: `rgb(${project.accent_color})`,
										color: "#FFFFFF",
										paddingBlock: "1.5rem",
										paddingInline: "2.75rem",
										textTransform: "uppercase",
									}}
								>
									{t.button}
								</button>
							</a>
						)}
						{project.figma_url && (
							<a
								target={"_blank"}
								rel="noreferrer"
								href={project.figma_url}
							>
								<FigmaIcon />
							</a>
						)}
					</div>
					{project.technologies &&
						project.technologies.length >= 1 && (
							<div
								className={styles.moreInfo}
								onClick={() =>
									setMoreInfoExpanded(!isMoreInfoExpanded)
								}
								onKeyUp={() =>
									setMoreInfoExpanded(!isMoreInfoExpanded)
								}
							>
								<p style={{ textTransform: "uppercase" }}>
									{isMoreInfoExpanded ? t.collapse : t.expand}
								</p>
								<DownArrow
									fill="var(--primary-01)"
									viewBox="0 0 24 24"
									width={"2.4rem"}
									height={"2.4rem"}
									style={{
										transform: isMoreInfoExpanded
											? "rotate(180deg)"
											: "rotate(0deg)",
										transition: "0.35s",
									}}
								/>
							</div>
						)}
				</div>
			</m.div>
		);
	});

	/* useLayoutEffect(() => {
		const carousel = document.getElementById("carousel");

		if (projectIndex && carousel) {
			carousel.style.maxHeight = `${carousel.scrollHeight}px`;
		}
	}, [projectIndex]); */

	const images = projects.map((project) => {
		return (
			<m.picture
				className={styles.imageHolder}
				key={projectIndex}
				{...column2Props}
			>
				<img
					style={{
						filter: `drop-shadow(0px 0px 10px rgba(${project.accent_color}, 0.5))`,
					}}
					className={styles.image}
					width={"100%"}
					sizes="((max-width: 768px)) 360px,
              (min-width: 769px) 720px"
					src={project.image_url}
					alt="Imagem representando o projeto"
				/>
			</m.picture>
		);
	});

	return (
		<LazyMotion features={domAnimation}>
			<div id="carousel" className={styles.carousel}>
				<div className={styles.holder}>
					<AnimatePresence mode="popLayout" initial={false}>
						{descriptions[projectIndex]}
					</AnimatePresence>
				</div>
				<div className={styles.column2Container}>
					<AnimatePresence mode="popLayout" initial={false} custom={direction}>
						{images[projectIndex]}
					</AnimatePresence>
					{children}
				</div>
			</div>
		</LazyMotion>
	);
}

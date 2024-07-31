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
import type { Dispatch, SetStateAction } from "react";
import type { Project } from "src/types/project";
import type React from "react";

// i18n
import type { translations } from "@/i18n/utils";
import { useTranslations } from "@/i18n/utils";

interface Props {
	children?: React.ReactNode;
	projects: Project[];
	lang?: string;
	projectIndex: number;
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

const column2Props = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: {
		ease: "easeInOut",
		duration: 0.45,
	},
} as MotionProps;

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
	projectIndex,
	setMoreInfoExpanded,
	isMoreInfoExpanded,
}: Props) {
	const projectStatusString = Object.keys(status_info).filter(
		(status) => status === projects[projectIndex].status,
	)[0];

	const projectStatusIcon =
		status_info[projects[projectIndex].status as keyof typeof status_info];

	const t = useTranslations(lang as keyof typeof translations).projects
		.carousel;

	const descriptions = projects.map((project) => {
		return (
			<m.div key={`description_${project.name}`} className={styles.info} {...column1Props}>
				<div
					style={{
						background: `linear-gradient(90deg, rgba(${project.accent_color}, 0.65) 0%, rgba(${project.accent_color}, 0.25) 57.29%, rgba(${project.accent_color}, 0) 100%)`,
					}}
					className={styles.headerDecoration}
				/>
				<div className={styles.infoHeader}>
					<div className={styles.statusHolder} /* {...popTransitionProps} */>
						{projectStatusIcon}
						<div className={styles.separator} />
						<p>{t.status[projectStatusString as keyof typeof t.status]}</p>
						{project.year && (
							<>
								<div className={styles.dot} />
								<p>
									{project.status === "WORK_IN_PROGRESS" && t.since}{" "}
									{project.year}
								</p>
							</>
						)}
					</div>
					<h3>{project.name || project.id}</h3>
					<h4>{project.description}</h4>
				</div>
				<div
					key={`$info_${project.name}`}
					className={styles.info} /* {...popTransitionProps} */
				>
					<div
						className={styles.buttonRow}
					>
						{project.project_url && (
							<a target={"_blank"} rel="noreferrer" href={project.project_url}>
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
							<a target={"_blank"} rel="noreferrer" href={project.figma_url}>
								<FigmaIcon />
							</a>
						)}
					</div>
					{project.technologies && project.technologies.length >= 1 && (
						<div
							className={styles.moreInfo}
							onClick={() => setMoreInfoExpanded(!isMoreInfoExpanded)}
							onKeyUp={() => setMoreInfoExpanded(!isMoreInfoExpanded)}
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
		)
	});

	const images = projects.map((project) => {
		return (
			<m.picture
				className={styles.imageHolder}
				key={`image_${project.name}`}
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
		)
	})

	return (
		<LazyMotion features={domAnimation}>
			<div className={styles.carrousel}>
				<div className={styles.holder}>
					<AnimatePresence mode="popLayout">
						{descriptions[projectIndex]}
					</AnimatePresence>
				</div>
				<div className={styles.column2Container}>
					<AnimatePresence mode="popLayout">
						{images[projectIndex]}
					</AnimatePresence>
					{children}
				</div>
			</div>
		</LazyMotion>
	);
}

import { useState } from "react";

import styles from "@/styles/projects.module.css";

// Components
import ProjectsCarousel from "@/components/Landing/Sections/Projects/Carousel";

// Icons
import ChevronLeft from "@/assets/icons/chevron.svg?react";
import LinkIcon from "@/assets/icons/link.svg?react";
import GithubLogo from "@/assets/icons/github.svg?react";

import type { Project, ProjectTechnology } from "src/lib/types/project";

// Internationalization
import { useTranslations } from "@/i18n/utils";
import type { translations } from "@/i18n/utils";

interface Props {
	projects: Project[];
	lang?: string;
}

export default function Projects({ projects, lang }: Props) {
	const [projectIndex, setProjectIndex] = useState(0);
	const [isMoreInfoExpanded, setMoreInfoExpanded] = useState(true);

	const t = useTranslations(lang as keyof typeof translations).projects;

	const projectTechs = projects[projectIndex].technologies;

	return (
		<section className={`${styles.projects} section wrapper`} id="projects">
			<header className={"subtitle"}>
				<p>{t.title}</p>
				<div />
			</header>
			<ProjectsCarousel
				lang={lang}
				projects={projects}
				projectIndex={projectIndex}
				setMoreInfoExpanded={setMoreInfoExpanded}
				isMoreInfoExpanded={isMoreInfoExpanded}
			>
				<Paginator
					projects={projects}
					projectIndex={projectIndex}
					setProjectIndex={setProjectIndex}
				/>
			</ProjectsCarousel>

			{projectTechs && projectTechs.length >= 1 && (
				<div
					className={styles.projectTechnologies}
					style={{
						maxHeight: isMoreInfoExpanded ? "100rem" : "0",
					}}
				>
					{projectTechs.length > 1 && <h5>{t.info.title}</h5>}
					<ul className={styles.projectTechs}>
						{projects &&
							projectTechs.map((column: ProjectTechnology) => {
								const techsColumn = column.techs as string[];

								return (
									<li key={column.name}>
										<div className={styles.column}>
											<a
												target={"_blank"}
												rel="noreferrer"
												href={column.link || "#"}
												className={styles.title}
											>
												<h6 className={column.link ? styles.link : ""}>
													{column.name}
												</h6>
												{column.link && <LinkIcon />}
											</a>
											<ul key={`${column.name}_tech`}>
												{techsColumn?.map((tech) => (
													<li key={tech}>{tech}</li>
												))}
											</ul>
											{column.outro && <p>{column.outro}</p>}
										</div>
									</li>
								);
							})}
					</ul>
				</div>
			)}
			<GithubButton title={t.info.github} />
		</section>
	);
}

function Paginator({
	projects,
	projectIndex,
	setProjectIndex,
}: {
	projects: Project[];
	projectIndex: number;
	setProjectIndex: (index: number) => void;
}) {
	return (
		<div className={styles.sectionDots}>
			<ChevronLeft
				style={{
					cursor: projectIndex === 0 ? "initial" : "pointer",
					transition: "0.5s",
					opacity: projectIndex === 0 ? 0.5 : 1,
				}}
				fill="var(--primary-01)"
				onClick={() => {
					if (projectIndex > 0) {
						setProjectIndex(projectIndex - 1);
					}
				}}
			/>
			<ul>
				{projects?.map((project, index) => {
					const isCurrentProject = index === projectIndex;
					return (
						<li
							onClick={() => setProjectIndex(index)}
							onKeyUp={() => setProjectIndex(index)}
							key={project.name}
						>
							<div
								style={{
									backgroundColor: isCurrentProject
										? `rgb(${project.accent_color})`
										: "var(--primary-01)",
								}}
								className={`${isCurrentProject && "bulletUp"}`}
							/>
						</li>
					);
				})}
			</ul>
			<ChevronLeft
				style={{
					cursor: projectIndex === projects.length - 1 ? "initial" : "pointer",
					transition: "0.5s",
					transform: "rotate(180deg)",
					opacity: projectIndex === projects.length - 1 ? 0.5 : 1,
				}}
				fill="var(--primary-01)"
				onClick={() => {
					if (projectIndex < projects.length - 1) {
						setProjectIndex(projectIndex + 1);
					}
				}}
			/>
		</div>
	);
}

function GithubButton({ title }: { title: string }) {
	return (
		<a
			target={"_blank"}
			rel="noreferrer"
			href="https://github.com/theduardomaciel"
		>
			<button
				type="button"
				className="button inverted modern"
				style={{
					fontSize: "1.4rem",
					paddingInline: "3rem",
					paddingBlock: "1.25rem",
					marginBottom: "1rem",
				}}
			>
				<GithubLogo
					width={"1.8rem"}
					height={"1.8rem"}
					aria-label="Github icon"
				/>
				{title}
			</button>
		</a>
	);
}

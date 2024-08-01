export interface TechSection {
	id: string;
	techs?: Tech[];
}

export interface Tech {
	name: string;
	experience_level: 1 | 2 | 3;
	icon_url: string;
}

export interface TechSection {
	id: string;
	techs?: Tech[];
}

export interface Tech {
	name: string;
	experienceSince: string;
	icon_url: string;
}

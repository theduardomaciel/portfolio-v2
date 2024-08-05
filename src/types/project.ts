export interface Project {
    id: string;
    description: string;
    project_url?: string;
    figma_url: string;
    accent_color: string;
    image_url: string;
    status: string;
    year?: number;
    technologies?: ProjectTechnology[];
    name?: string;
}

export interface ProjectTechnology {
    name: string;
    link?: string;
    techs?: string[];
    outro?: string;
}

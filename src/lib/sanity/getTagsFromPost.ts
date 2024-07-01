export interface PostTag {
    title: string;
    description: string;
    _ref: string;
    _id: string;
}

export default function getTagsFromPost(allTags: PostTag[], postTags: PostTag[]) {
    const allTagsIds = allTags.map((tag: PostTag) => tag._id);

    return postTags.map((tag: PostTag) => {
        if (allTagsIds.includes(tag._ref)) {
            return allTags.find(
                (value: PostTag) => value._id === tag._ref
            );
        }
    });
}
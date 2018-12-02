import story, {
  SELECT_STORY,
  SET_STORIES,
  TOGGLE_INFO,
} from './story';

export const StoryNamespace = 'story';

export const StoryMutationTypes = {
  SELECT_STORY: `${StoryNamespace}/${SELECT_STORY}`,
  SET_STORIES: `${StoryNamespace}/${SET_STORIES}`,
  TOGGLE_INFO: `${StoryNamespace}/${TOGGLE_INFO}`,
};

export default story;

import FilterTypes from '../../../data/enum/FilterTypes';

export const SELECT_STORY = 'selectStory';
export const SET_STORIES = 'setStories';
export const TOGGLE_INFO = 'toggleInfo';

export default {
  namespaced: true,
  state: {
    selectedStory: null,
    selectedVariant: null,
    stories: [],
    info: {
      story: null,
      variant: null,
    },
  },
  getters: {
    labels(state) {
      return state.stories.reduce(
        (list, story) =>
          story.labels
            ? story.labels.reduce((list, l) => {
                if (!list.includes(l)) {
                  list.push(l);
                }
                return list;
              }, list)
            : list,
        [],
      );
    },
    types(state) {
      return state.stories.reduce(
        (list, story) =>
          story.types
            ? story.types.reduce((list, t) => {
                if (!list.includes(t)) {
                  list.push(t);
                }
                return list;
              }, list)
            : list,
        [FilterTypes.ALL],
      );
    },
    isSingleStorySelected(state) {
      return state.selectedStory && state.selectedVariant !== null;
    },
    panelInfo(state, { isSingleStorySelected }) {
      if (isSingleStorySelected) {
        return {
          story: state.selectedStory,
          variant: state.selectedVariant,
        };
      }

      if (state.info.variant) {
        return state.info;
      }

      return null;
    },
    selectedVariantName(state) {
      if (state.selectedStory === null || state.selectedVariant === null) {
        return null;
      }
      return state.stories.find(
        ({ slug, variant }) => slug === state.selectedStory && variant === state.selectedVariant,
      ).label;
    },
    selectedStoryInfo(state, { panelInfo }) {
      if (panelInfo === null) {
        return null;
      }
      return state.stories.find(
        ({ slug, variant }) => slug === panelInfo.story && variant === panelInfo.variant,
      );
    },
  },
  mutations: {
    [SELECT_STORY]: (state, { story = null, variant = null }) => {
      state.selectedStory = story;
      state.selectedVariant = variant;

      state.info.story = null;
      state.info.variant = null;
    },
    [SET_STORIES]: (state, stories = []) => {
      console.log('mutate state', stories);
      state.stories = stories;
    },
    [TOGGLE_INFO]: (state, { story, variant }) => {
      console.log('toggle info', story, variant);
      if (state.info.story === story && state.info.variant === variant) {
        state.info.story = null;
        state.info.variant = null;
      } else {
        state.info.story = story;
        state.info.variant = variant;
      }
    },
  },
  actions: {},
};

import { mapMutations, mapState } from 'vuex';
import { AppNamespace } from '../store/module/app';
import { StoryMutationTypes, StoryNamespace } from '../store/module/story';

export default {
  name: 'App',
  computed: {
    ...mapState(StoryNamespace, {
      selectedStory: 'selectedStory',
      selectedVariant: 'selectedVariant',
    }),
    ...mapState(AppNamespace, {
      selectedType: 'selectedType',
      selectedLabels: 'selectedLabels',
    }),
    storyList() {
      return {
        story: this.selectedStory,
        variant: this.selectedVariant,
        type: this.selectedType,
        labels: this.selectedLabels,
      };
    }
  },
  watch: {
    storyList(value) {
      this.updateStoryList(value)
    },
  },
  methods: {
    ...mapMutations({
      setStories: StoryMutationTypes.SET_STORIES,
      toggleInfo: StoryMutationTypes.TOGGLE_INFO,
      selectStory: StoryMutationTypes.SELECT_STORY,
    }),
    updateStoryList(info) {
      console.log('update');
      if (document.querySelector('iframe')) {
        console.log('actually update');
        document.querySelector('iframe').contentWindow.postMessage(
          {
            source: 'storybook',
            action: 'show-story',
            ...info,
          },
          location.origin,
        );
      }
    }
  },
  mounted() {
    console.log('mounted');

    console.log('LISTENING');
    window.addEventListener('message', event => {
      if (event.origin === location.origin) {
        console.log('receive', event.data);
        const { source, action, data } = event.data;
        if (source === 'storybook') {
          if (action === 'set-stories') {
            console.log('PARSED', JSON.parse(data));
            this.setStories(JSON.parse(data));
          }
          if (action === 'select-story') {
            this.selectStory(data);
          }
          if (action === 'toggle-info') {
            console.log('toggle-info', data);
            this.toggleInfo(data);
          }
        }
      }
    });

    if (document.location.port === "8080") {
      this.setStories(require('../data/stories'));
    }

    this.updateStoryList(this.storyList);
  }
};

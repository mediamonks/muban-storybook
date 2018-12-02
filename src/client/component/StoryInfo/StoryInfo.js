import { mapMutations } from 'vuex';
import { StoryMutationTypes } from '../../store/module/story';

export default {
  name: 'StoryInfo',
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      selectStory: StoryMutationTypes.SELECT_STORY,
    }),
    onSelectComponent(event, story) {
      event.preventDefault();
      this.selectStory({ story: story.slug });
    },
    onSelectVariant(event, story) {
      console.log('selectVariant', story);
      event.preventDefault();
      this.selectStory({ story: story.slug, variant: story.variant });
    },
  }
};

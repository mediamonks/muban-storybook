import { mapGetters, mapMutations } from 'vuex';
import { StoryMutationTypes, StoryNamespace } from '../../store/module/story';
import StoryInfo from '../StoryInfo';
import StorySource from '../StorySource';

export default {
  name: 'InfoPanel',
  components: {
    StoryInfo,
    StorySource,
  },
  computed: {
    ...mapGetters(StoryNamespace, {
      story: 'selectedStoryInfo',
      isSingleStorySelected: 'isSingleStorySelected',
    }),
  },
  methods: {
    ...mapMutations({
      toggleInfo: StoryMutationTypes.TOGGLE_INFO,
    }),
    onCloseClick() {
      this.toggleInfo({ story: null, variant: null });
    },
  },
};

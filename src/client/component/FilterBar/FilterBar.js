import { mapState, mapMutations, mapGetters } from 'vuex';
import FilterTypes from '../../data/enum/FilterTypes';
import { AppMutationTypes, AppNamespace } from '../../store/module/app';
import { StoryMutationTypes, StoryNamespace } from '../../store/module/story';

export default {
  name: 'FilterBar',
  computed: {
    ...mapState(AppNamespace, {
      selectedType: 'selectedType',
      selectedLabels: 'selectedLabels',
      enabled: 'filtersEnabled',
    }),
    ...mapState(StoryNamespace, {
      showBreadcrumbs: state => !!state.selectedStory,
      selectedStory: 'selectedStory',
      selectedVariant: 'selectedVariant',
    }),
    ...mapGetters(StoryNamespace, ['labels', 'types', 'selectedVariantName']),
  },
  methods: {
    ...mapMutations({
      selectType: AppMutationTypes.SELECT_TYPE,
      toggleLabel: AppMutationTypes.TOGGLE_LABEL,
    }),
    ...mapMutations({
      selectStory: StoryMutationTypes.SELECT_STORY,
    }),
    showAll() {
      this.selectStory({ story: null });
    },
    showStory() {
      this.selectStory({ story: this.selectedStory });
    },
  },
};

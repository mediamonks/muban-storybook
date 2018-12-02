import { mapState, mapMutations } from 'vuex';
import FilterTypes from '../../data/enum/FilterTypes';
import { AppNamespace } from '../../store/module/app';
import { StoryMutationTypes, StoryNamespace } from '../../store/module/story';

export default {
  name: 'SearchResults',
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    active: false,
    filterEnabled: true,
    labelEnabled: false,
  }),
  computed: {
    ...mapState(StoryNamespace, ['stories']),
    ...mapState(AppNamespace, ['selectedType', 'selectedLabels', 'searchQuery']),
    componentCount() {
      return this.storyMap.length;
    },
    presetCount() {
      return this.storyMap.reduce((acc, story) => acc + story.variants.length, 0);
    },
    filteredStories() {
      return this.stories.filter(story => {
        if (
          this.searchQuery &&
          !(
            story.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            story.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            story.path.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        ) {
          return false; // doesn't match search
        }

        if (!this.filterEnabled) {
          return true; // early exit
        }

        if (!this.selectedType === FilterTypes.ALL && this.selectedLabels.length === 0) {
          return true; // early exit
        }

        if (this.selectedType !== FilterTypes.ALL && !story.types.includes(this.selectedType)) {
          return false; // incorrect type
        }

        if (
          this.selectedLabels.length > 0 &&
          !story.labels.some(l => this.selectedLabels.includes(l))
        ) {
          return false; // doesn't match any label
        }

        return true;
      });
    },
    storyMap() {
      return Object.values(
        this.filteredStories.reduce((list, story) => {
          if (!list[story.name]) {
            list[story.name] = {
              slug: story.slug,
              label: story.name,
              path: story.path,
              labels: story.labels,
              types: story.types,
              variants: [],
            };
          }
          list[story.name].variants.push(story);
          return list;
        }, {}),
      );
    },
    storiesByLabel() {
      return this.storyMap.reduce((list, story) => {
        if (story.labels.length === 0) {
          if (!list['other']) {
            list['other'] = [];
          }
          list['other'].push(story);
        } else {
          story.labels.forEach(l => {
            if (!list[l]) {
              list[l] = [];
            }
            list[l].push(story);
          });
        }
        return list;
      }, {});
    },
    storiesByType() {
      return this.storyMap.reduce((list, story) => {
        if (story.types.length === 0) {
          if (!list['other']) {
            list['other'] = [];
          }
          list['other'].push(story);
        } else {
          story.types.forEach(t => {
            if (!list[t]) {
              list[t] = [];
            }
            list[t].push(story);
          });
        }
        return list;
      }, {});
    },
    storyList() {
      return this.labelEnabled ? this.storiesByLabel : this.storiesByType;
    },
  },
  methods: {
    ...mapMutations({
      selectStory: StoryMutationTypes.SELECT_STORY,
    }),
    onHeaderClick(event) {
      event.preventDefault();
      this.$emit('cancelblur');
    },
    onSelectComponent(event, story) {
      event.preventDefault();
      this.selectStory({ story: story.slug });
    },
    onSelectVariant(event, story) {
      console.log('selectVariant', story);
      event.preventDefault();
      this.selectStory({ story: story.slug, variant: story.variant });
    },
  },
  mounted() {
    console.log('mounted');
    setTimeout(() => {
      this.active = true;
    }, 500);
  },
};

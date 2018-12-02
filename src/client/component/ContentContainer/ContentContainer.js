import { mapState, mapGetters, mapMutations } from 'vuex'
import { AppMutationTypes, AppNamespace } from '../../store/module/app';
import { StoryNamespace } from '../../store/module/story';

const RESIZER_WIDTH = 13;

export default {
  name: 'ContentContainer',
  data: () => ({
    offsetX: 0,
    isBefore: false,
  }),
  computed: {
    ...mapState(AppNamespace, {
      deviceEmulationEnabled: 'deviceEmulation',
      filtersEnabled: 'filtersEnabled',
      viewportWidth: 'viewportWidth',
      isResizing: 'isViewportResizing',
    }),
    ...mapState(StoryNamespace, {
      showBreadcrumbs: state => !!state.selectedStory,
    }),
    ...mapGetters(StoryNamespace, ['panelInfo']),
  },
  methods: {
    ...mapMutations({
      setResizing: AppMutationTypes.SET_VIEWPORT_RESIZING,
      setViewportWidth: AppMutationTypes.SET_VIEWPORT_WIDTH,
    }),
    onMouseDown(event, isBefore) {
      this.offsetX = event.offsetX;
      this.isBefore = isBefore;

      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);

      this.setResizing(true);
    },
    onMouseMove(event) {
      const centerX = window.innerWidth / 2;
      let sideOffset;
      let halfWidth;
      if (this.isBefore) {
        sideOffset = event.pageX + (RESIZER_WIDTH - this.offsetX);
        halfWidth = centerX - sideOffset;
      } else {
        sideOffset = event.pageX - this.offsetX;
        halfWidth = sideOffset - centerX;
      }

      this.setViewportWidth(halfWidth * 2);
    },
    onMouseUp() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);

      this.setResizing(false);
    },
  },
};

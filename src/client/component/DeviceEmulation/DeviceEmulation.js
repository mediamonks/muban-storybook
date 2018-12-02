import { mapState, mapMutations } from 'vuex'
import { AppMutationTypes, AppNamespace } from '../../store/module/app';

export default {
  name: 'DeviceEmulation',
  data: () => ({
    defaultBreakpoints: [
      { max: 2650, label: '4k' },
      { max: 1440, label: 'Laptop L' },
      { max: 1024, label: 'Laptop' },
      { max: 768, label: 'Tablet' },
      { max: 425, label: 'Mobile L' },
      { max: 375, label: 'Mobile M' },
      { max: 320, label: 'Mobile S' },
    ],
    projectBreakpoints: [
      { max: 700 },
      { max: 1100 },
      { min: 800, max: 1000 },
      { min: 900, max: 1050 },
      { min: 600 },
      { min: 1200 },
    ],
  }),
  computed: {
    ...mapState(AppNamespace, {
      enabled: 'deviceEmulation',
      viewportWidth: 'viewportWidth',
    }),
    breakpointsMax() {
      return this.projectBreakpoints.filter(b => !b.min && !!b.max).sort().reverse().map(({ max }) => ({
        max,
        isActive: this.viewportWidth <= max,
      }));
    },
    breakpointsMinMax() {
      return this.projectBreakpoints.filter(b => !!b.min && !!b.max).sort((a, b) => {
        if (a.min === b.min) {
          if (a.max === b.max) {
            return 0;
          }
          return a.max < b.max ? -1 : 1;
        }
        return a.min < b.min ? -1 : 1;
      }).map(({ min, max }) => ({
        min,
        max,
        width: (max - min) / 2,
        offset: min / 2,
        isActive: this.viewportWidth >= min && this.viewportWidth <= max,
      }));
    },
    breakpointsMin() {
      return this.projectBreakpoints.filter(b => !b.max && !!b.min).sort().map(({ min }) => ({
        min,
        isActive: this.viewportWidth >= min,
      }));
    },
  },
  methods: {
    ...mapMutations({
      setViewportWidth: AppMutationTypes.SET_VIEWPORT_WIDTH,
    }),
    onBreakpointClick({ min, max }) {
      console.log(min, max);

      const type = !!min ? ( !!max ? 'min-max'  : 'min') : 'max';
      const currentWidth = this.viewportWidth;
      let newWidth = currentWidth;

      if (type === 'max') {
        newWidth = max;
      }
      if (type === 'min') {
        newWidth = min;
      }
      if (type === 'min-max') {
        if (min === currentWidth) {
          newWidth = max;
        } else {
          newWidth = min;
        }
      }

      if (newWidth !== currentWidth) {
        this.setViewportWidth(newWidth);
      }
    }
  }
};

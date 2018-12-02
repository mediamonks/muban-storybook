export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    // tabs: [
    //   { label: 'Example', content: 'Example content' },
    //   { label: 'Data', content: 'Data content' },
    //   { label: 'HTML', content: 'HTML content' },
    //   { label: 'Handlebars', content: 'Handlebars content' },
    //   { label: 'Style', content: 'Style content' },
    //   { label: 'Script', content: 'Script content' },
    // ],
    selectedIndex: 0,
  }),
  methods: {
    isSelected(index) {
      return this.selectedIndex === index;
    },
    selectTab(index) {
      this.selectedIndex = index;
    },
  }
};

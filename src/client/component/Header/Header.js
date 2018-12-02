import { mapMutations, mapState } from 'vuex'
import { AppMutationTypes, AppNamespace } from '../../store/module/app';
import SearchResults from '../SearchResults';

export default {
  name: 'Header',
  components: {
    SearchResults,
  },
  data: () => ({
    searchOpened: false,
  }),
  computed: {
    ...mapState(AppNamespace, {
      deviceEmulationSelected: 'deviceEmulation',
      filterSelected: 'filtersEnabled',
    }),
    searchQuery: {
      get () {
        return this.$store.state.app.searchQuery
      },
      set (value) {
        this.setSearchQuery(value);
      }
    }
  },
  methods: {
    ...mapMutations({
      setDeviceEmulation: AppMutationTypes.SET_DEVICE_EMULATION,
      setFilters: AppMutationTypes.SET_FILTERS,
      setSearchQuery: AppMutationTypes.SET_SEARCH_QUERY,
    }),
    toggleDeviceClick() {
      this.setDeviceEmulation(!this.deviceEmulationSelected);
    },
    toggleFiltersClick() {
      this.setFilters(!this.filterSelected);
    },
    onSearchFocus() {
      this.searchOpened = true;
      document.addEventListener('keyup', this.onKeyUp);
      setTimeout(() => {
        document.addEventListener('mousedown', this.onDocumentClick);
      }, 100);
    },
    onSearchBlur() {
      this.searchOpened = false;
      document.removeEventListener('keyup', this.onKeyUp);
      document.removeEventListener('mousedown', this.onDocumentClick);
    },
    onKeyUp(event) {
      switch (event.keyCode) {
        case 27: // ESC
          this.$refs.searchInput.blur();
          this.onSearchBlur();
      }
    },
    onDocumentClick() {
      this.blurTimeout = setTimeout(() => {
        if (document.activeElement !== this.$refs.searchInput) {
          this.onSearchBlur();
        }
      }, 200);
    },
    onCancelBlur() {
      this.$nextTick(() => {
        clearTimeout(this.blurTimeout);
        this.$refs.searchInput.focus();
      })
    }
  }
};

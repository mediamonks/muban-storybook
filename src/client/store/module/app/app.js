import FilterTypes from '../../../data/enum/FilterTypes';

export const SET_DEVICE_EMULATION = 'setDeviceEmulation';
export const SET_FILTERS = 'setFilters';
export const SET_VIEWPORT_WIDTH = 'setViewportWidth';
export const SET_VIEWPORT_RESIZING = 'setViewportResizing';
export const SELECT_TYPE = 'selectType';
export const TOGGLE_LABEL = 'toggleLabel';
export const SET_SEARCH_QUERY = 'setSearchQuery';

export default {
  namespaced: true,
  state: {
    deviceEmulation: false,
    filtersEnabled: false,
    viewportWidth: 1024,
    isViewportResizing: false,
    selectedType: FilterTypes.ALL,
    selectedLabels: [],
    searchQuery: '',
  },
  getters: {
  },
  mutations: {
    [SET_DEVICE_EMULATION]: (state, enabled) => {
      state.deviceEmulation = enabled;
    },
    [SET_FILTERS]: (state, enabled) => {
      state.filtersEnabled = enabled;
    },
    [SET_VIEWPORT_WIDTH]: (state, width) => {
      state.viewportWidth = width;
    },
    [SET_VIEWPORT_RESIZING]: (state, isResizing) => {
      state.isViewportResizing = isResizing;
    },
    [SELECT_TYPE]: (state, type) => {
      state.selectedType = type;
    },
    [TOGGLE_LABEL]: (state, label) => {
      if (state.selectedLabels.includes(label)) {
        state.selectedLabels = state.selectedLabels.filter(l => l !== label);
      } else {
        state.selectedLabels.push(label);
      }
    },
    [SET_SEARCH_QUERY]: (state, value) => {
      state.searchQuery = value;
    },
  },
  actions: {},
};

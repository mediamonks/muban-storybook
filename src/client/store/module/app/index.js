import app, {
  SET_DEVICE_EMULATION,
  SET_VIEWPORT_RESIZING,
  SET_VIEWPORT_WIDTH,
  SELECT_TYPE,
  TOGGLE_LABEL,
  SET_FILTERS,
  SET_SEARCH_QUERY,
} from './app';

export const AppNamespace = 'app';

export const AppMutationTypes = {
  SET_DEVICE_EMULATION: `${AppNamespace}/${SET_DEVICE_EMULATION}`,
  SET_FILTERS: `${AppNamespace}/${SET_FILTERS}`,
  SET_VIEWPORT_RESIZING: `${AppNamespace}/${SET_VIEWPORT_RESIZING}`,
  SET_VIEWPORT_WIDTH: `${AppNamespace}/${SET_VIEWPORT_WIDTH}`,
  SELECT_TYPE: `${AppNamespace}/${SELECT_TYPE}`,
  TOGGLE_LABEL: `${AppNamespace}/${TOGGLE_LABEL}`,
  SET_SEARCH_QUERY: `${AppNamespace}/${SET_SEARCH_QUERY}`,
};

export default app;

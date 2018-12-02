import slugify from 'slugify';
import FilterTypes from '../data/enum/FilterTypes';
import preview from '../preview';

declare var require: any;

const stories = [];

const extractTypeList: Array<(info: { path: string }) => string | null> = [
  ({ path }) => (/[/\\]block[/\\]/gi.test(path) ? 'Block' : null),
  ({ path }) => (!/[/\\]block[/\\]/gi.test(path) ? 'Component' : null),
];

export type configureOptions = {
  extractTypes?: Array<(info: { path: string }) => string | null>;
};

/**
 * options:
 * - extractTypes Array<(info: { path: string}) => string | null>
 *
 * @param loadStories
 * @param options
 */
export function configure(loadStories: () => void, options: configureOptions = {}) {
  extractTypeList.push(...(options.extractTypes || []));

  loadStories();

  window.parent.postMessage(
    {
      source: 'storybook',
      action: 'set-stories',
      data: JSON.stringify(stories),
    },
    location.origin,
  );

  window.addEventListener('message', event => {
    if (event.origin === location.origin) {
      const { source, action, story: slug, variant, type, labels } = event.data;
      if (source === 'storybook') {
        if (action === 'show-story') {
          console.log('FILTER STORIES', slug, variant, type, labels);

          preview(
            stories.filter(story => {
              if (!slug) {
                if (type === FilterTypes.ALL && labels.length === 0) {
                  return true; // early exit
                }

                if (type !== FilterTypes.ALL && !story.types.includes(type)) {
                  return false; // incorrect type
                }

                if (
                  labels.length > 0 &&
                  !story.labels.some(l => labels.includes(l))
                ) {
                  return false; // doesn't match any label
                }

                return true;
              } else {
                return (slug ? story.slug === slug : true) && (variant ? story.variant === variant : true);
              }
            }),
          );
        }
      }
    }
  });

  preview(stories);
}

export function storiesOf(name:string, component:any) {
  return {
    add(label = 'default', description = '', template, props = {}, labels = []) {
      stories.push({
        name,
        label,
        description,
        template,
        props,
        labels,
        path: component.path,
        types: extractTypeList.map(fn => fn({ path: component.path })).filter(Boolean),
        source: component,
        preview: template.compiled(props),
        component: component.default,
        slug: slugify(name, { lower: true }),
        variant: slugify(label, { lower: true }),
      });

      return this;
    },
  };
}

export function getAllStories() {
  return stories;
}

export function getStories(name, variant) {
  if (!name) {
    return Object.keys(stories).reduce((list, storyName) => list.concat(stories[storyName]), []);
  }
  if (!variant) {
    return stories[name];
  }
  return [stories[name][variant]];
}

export function getStory(name, variant) {
  return stories[name] && stories[name][variant];
}

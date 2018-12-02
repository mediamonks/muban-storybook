import slugify from 'slugify';
import './preview.scss';
import initComponents from 'muban-core/lib/utils/initComponents';

function sendToParent(action, data) {
  window.parent.postMessage(
    {
      source: 'storybook',
      action,
      data,
    },
    location.origin,
  );
}

export default function preview(stories) {
  console.log(stories);
  const showHeading = stories.length > 1;

  document.querySelector('#app').innerHTML = stories.reduce((content, story) => {
    const heading = showHeading ? `
      <div class="story-headline">
        <h2 data-slug="${story.slug}" data-variant="${story.variant}">
          <span class="story-name">${story.name}</span>
          <span class="story-variant">${story.label}</span>
          <svg fill="#546e7a" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
          </svg>
        </h2>
      </div>
    ` : '';

    const storyItem = `
      <div class="story-item path-${slugify(story.path.replace(/[/\\.]/gi, '-'))} name-${story.slug} variant-${story.variant} ${story.types.map(t => `type-${t.toLowerCase()}`)}">
        ${story.preview}
      </div>
    `;

    return `${content}${heading}${storyItem}`;
  }, '');

  initComponents(document.querySelector('#app'));

  Array.from(document.querySelectorAll('.story-headline svg')).forEach(info => {
    info.addEventListener('click', (event) => {
      const data = (<HTMLElement>event.currentTarget).closest('h2').dataset;
      sendToParent('toggle-info', {
        story: data.slug,
        variant: data.variant,
      });
    });
  });
  Array.from(document.querySelectorAll('.story-name')).forEach(info => {
    info.addEventListener('click', (event) => {
      const data = (<HTMLElement>event.currentTarget).closest('h2').dataset;
      sendToParent('select-story', {
        story: data.slug,
      });
    });
  });
  Array.from(document.querySelectorAll('.story-variant')).forEach(info => {
    info.addEventListener('click', (event) => {
      const data = (<HTMLElement>event.currentTarget).closest('h2').dataset;
      sendToParent('select-story', {
        story: data.slug,
        variant: data.variant,
      });
    });
  });
}

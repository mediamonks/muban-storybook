import highlightJs from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';

import Tabs from '../Tabs';

function cleanupSource(content, language) {
  let newContent;

  newContent = content.replace(/(^\s+|\s+$)/gi, '');

  newContent = highlightJs
    .highlight(language, newContent.replace(/\t/gi, '  '))
    .value.replace(/\n/gi, '<br />');

  return newContent;
}

export default {
  name: 'StorySource',
  components: {
    Tabs,
  },
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tabData() {
      const tabs = [];

      tabs.push({
        label: 'Data',
        content: cleanupSource(JSON.stringify(this.story.props, null, 2), 'json'),
      });
      tabs.push({
        label: 'Handlebars',
        content: cleanupSource(this.story.source.template, 'handlebars'),
      });
      tabs.push({
        label: 'Style',
        content: cleanupSource(this.story.source.style, 'scss'),
      });
      if (this.story.source.script) {
        tabs.push({
          label: 'Script',
          content: cleanupSource(this.story.source.script, 'typescript'),
        });
      }

      return tabs;
    }
  }
};

/* eslint-disable max-len */
import { storiesOf } from 'util/utils';

storiesOf('Footer', require('./footer.hbs')).add(
  'default',
  'The footer that we show on each page of the website, contains the copyright.',
  `<hbs>
			{{> footer }}
		</hbs>`,
  {},
  ['layout'],
);

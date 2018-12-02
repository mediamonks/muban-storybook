/* eslint-disable max-len */
import { storiesOf } from 'util/utils';

storiesOf('Header', require('./header.hbs')).add(
  'default',
  'The header that we show on each page of the website, contains the navigation.',
  `<hbs>
			{{> header }}
		</hbs>`,
  {},
  ['layout'],
);

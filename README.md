# muban-storybook

**muban-storybook** is a [Storybook](https://storybook.js.org/) inspired component viewer
specifically tailored for [muban](https://github.com/mediamonks/muban/) projects.

It exposes an API where you can register your component presets, and has a web UI built in Vue where
you can interact with those presets.

## Setup

1. Install storybook

    ```sh
    yarn add muban-storybook
    ```

2. Create a config file, `src/storybook/config.js`:

    ```js
    import { configure } from 'muban-storybook';
    
    const context = require.context('app/component/', true, /preset\.js$/);
    
    function loadStories() {
      context.keys().forEach(context);
    }
    
    configure(loadStories);
    ```

3. Create a preset for your component, `app/component/paragraph/preset.js`

    ```js
    import { storiesOf } from 'muban-storybook';
    
    storiesOf('Paragraph', require('./paragraph'))
      .add(
        'default',
        'A Paragraph block with a "read more" section you can show by clicking a button.',
        `<hbs>
          {{> paragraph @root }}
        </hbs>`,
        require('./data'),
        ['block'],
      );
    ```
    
    with a data file, `app/component/paragraph.yaml`
    
    ```yaml
    title: What is Lorem Ipsum?
    content: >
      industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
      unknown printer took a galley of type and scrambled it to make a type specimen book. It has
    
    ctaReadMore: 'read more...'
    contentMore: >
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
      classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
    ```
    
4. Start your storybook by pointing to the config folder

    ```sh
    node muban-storybook-server -c src/storybook -p 8081
    ```

5. Or create a static deployable version

    ```sh
    node muban-storybook-build -c src/storybook -o ./dist/storybook
    ```
    
## API

### configure

```ts
export type configureOptions = {
  extractTypes?: Array<(info: { path: string }) => string | null>;
};

configure(loadStories: () => void, options: configureOptions = {})
```

The `configure` function mus be called from the config file that is passed to the storybook cli.
It's the integration point between the storybook UI and your components.

* `loadStories` A function that is called from storybook and is supposed to require all the preset
  files. You can manually import all files, or use a webpack context:
  
  ```js
  function loadStories() {
    context.keys().forEach(context);
  }
  
  configure(loadStories);
  ```
  
* `configureOptions.extractTypes` An Array of functions to extract a component type from. You
  usually organize your components in multiple folders (e.g. blocks vs elements, or buttons, forms
  and content items). You can these functions to extract the desired type from the component path.
  
  The default implementation can be used as an example on how to use this:
  
  ```ts
  const extractTypeList: Array<(info: { path: string }) => string | null> = [
    ({ path }) => (/[/\\]block[/\\]/gi.test(path) ? 'Block' : null),
    ({ path }) => (!/[/\\]block[/\\]/gi.test(path) ? 'Component' : null),
  ];
  ```
  
  It will execute all functions in the array until one of them returns a string, so the order in
  which they are added matters. If you want more control over grouping components, you can also use
  the `labels` option when adding presets, but that's more manual work.

### storiesOf

```
storiesOf(name:string, component:any)
```

* `name` The name of the component that will be displayed in the UI

* `component` The exported component (where the component is exported as default). There are some
  custom webpack loaders configured to process component files loaded from presets that will add
  additional information in the export (like the path it's being required from).

* `returns` A component object with new methods to add stories.

```
storiesOf('Paragraph', require('./paragraph'))
```

### storiesOf.add

```
add(label = 'default', description = '', template:string, props = {}, labels:Array<string> = []) 
```

* `label` A name of the preset, mostly useful when adding more than one preset for a component

* `description` To explain the component or preset

* `template` The visual part of the preset, rendering the component using inline handlebars. You can
  add any arbitrary html, or render the component multiple times. To pass data to the component you
  can use the `@root` context variable to pass the data from the `props` parameter, or use
  `key=value` properties to set hardcoded values.
  
* `labels` An array of labels to group certain types of components, so they can be shown together in
  the web UI.

* `returns` The same component object (this), so you can chain multiple `add`s after each other.

```js
storiesOf('Paragraph', require('./paragraph'))
  .add(
    'default',
    'A Paragraph block with a "read more" section you can show by clicking a button.',
    `<hbs>
      {{> paragraph @root }}
    </hbs>`,
    require('./data'),
    ['block'],
  );
```

## Internal workings

This module contains a few different things:
* A web UI built in Vue, that's not exposed, with internal webpack config for dev and building
* cli entries in the bin folder for starting and building storybook
* a webpack 

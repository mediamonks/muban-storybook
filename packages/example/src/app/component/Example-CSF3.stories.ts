import type { Meta } from "@muban/storybook";
import ExampleComponent from "./Component";

export default {
  title: "CSF v3",
  component: ExampleComponent,
} as Meta;

export const Default = {
  render: () => ({
    template: `<hbs> {{> example }} </hbs>`,
  }),
  args: {
    heading: "CSF3 story",
    copy: `Hello, I'm a muban 1 component story :)
  <br> I'm being rendered using storybook's Component Story Format 3.0 <br>
  <a href="https://storybook.js.org/blog/component-story-format-3-0/">Read about CSF3</a>
  `,
  },
};

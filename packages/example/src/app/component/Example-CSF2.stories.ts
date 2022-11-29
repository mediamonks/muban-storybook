import ExampleComponent from "./Component";
import type { Meta } from "@muban/storybook";

export default {
  title: "CSFv2",
  component: ExampleComponent,
} as Meta;

export const Default = () => ({
  template: `<hbs> {{> example }} </hbs>`,
});

Default.args = {
  heading: "CSF2 story",
  copy: `Hello, I'm a muban 1 component story :)
  <br> I'm being rendered using storybook's Component Story Format 2.0 <br>
  <a href="https://storybook.js.org/docs/react/api/csf">Read about Component Story Format</a>
  `,
};

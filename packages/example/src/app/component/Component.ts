import { CoreComponent } from "muban-core";
export default class ExampleComponent extends CoreComponent {
  public static readonly displayName: string = "example-component";

  constructor(el: HTMLElement) {
    super(el);
  }
}

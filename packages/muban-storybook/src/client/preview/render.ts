/* eslint-disable no-restricted-properties,@typescript-eslint/no-explicit-any */
import { document } from 'global';
import { getComponentForElement, initComponents } from 'muban-core';
import dedent from 'ts-dedent';
import type { RenderContext, StoryFnMubanReturnType } from './types';
import type { ArgsStoryFn } from '@storybook/csf';
import type { MubanFramework } from './types-6-0';

const rootElement = document.querySelector('#root');

export function renderToDom({
  storyFn,
  kind,
  name,
  showMain,
  showError,
  storyContext: { parameters, args },
}: RenderContext<MubanFramework>): void {
  const componentStory = storyFn(args as any) as StoryFnMubanReturnType;
  showMain();

  const data = componentStory.data ? componentStory.data : args;

  const templateFn =
    (componentStory.template && componentStory.template.compiled) ||
    parameters.component.default ||
    parameters.component;

  if (!templateFn) {
    showError({
      title: `Expected a template function from the component or story from the story: "${name}" of "${kind}".`,
      description: dedent`
          The template function is pulled from the component passed to the default export.
          Did you incorrectly configure the "preset-loader"?
        `,
    });
    return;
  }

  // todo use "forceRender === true" to skip re-mounting?
  rootElement.innerHTML = templateFn(data);

  initComponents(rootElement);

  const instance = getComponentForElement(rootElement.firstElementChild) as any;

  if (instance && instance.dispatcher && instance.dispatcher.addEventListener) {
    Object.entries(args).forEach(([key, value]) => {
      if (typeof value === 'function') {
        instance.dispatcher.addEventListener(key, (event: Event) => {
          value(event);
        });
      }
    });
  }
}

export const render: ArgsStoryFn<MubanFramework> = (props, context) => {
  const { id, component: Component } = context;
  if (!Component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`,
    );
  }

  return {
    component: Component,
    template: () => '',
  };
};

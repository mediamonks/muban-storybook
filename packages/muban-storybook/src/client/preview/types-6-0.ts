/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StoryFnMubanReturnType } from './types';
import type {
  Args as DefaultArgs,
  StoryAnnotations,
  ComponentAnnotations,
  AnnotatedStoryFn,
} from '@storybook/csf';
export type { Args, ArgTypes, Parameters, StoryContext } from '@storybook/csf';

type MubanComponent = any;

export type MubanFramework = {
  component: MubanComponent;
  storyResult: StoryFnMubanReturnType;
};

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<Args = DefaultArgs> = ComponentAnnotations<MubanFramework, Args>;

/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryFn<Args = DefaultArgs> = AnnotatedStoryFn<MubanFramework, Args>;

/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryObj<Args = DefaultArgs> = StoryAnnotations<MubanFramework, Args>;

/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 *
 * NOTE that in Storybook 7.0, this type will be renamed to `StoryFn` and replaced by the current `StoryObj` type.
 *
 */
export type Story<Args = DefaultArgs> = StoryFn<Args>;

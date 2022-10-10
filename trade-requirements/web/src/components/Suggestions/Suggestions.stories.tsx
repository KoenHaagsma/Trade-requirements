// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Suggestions> = (args) => {
//   return <Suggestions {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Suggestions from './Suggestions'

export const generated = () => {
  return <Suggestions />
}

export default {
  title: 'Components/Suggestions',
  component: Suggestions,
} as ComponentMeta<typeof Suggestions>

// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof UserAuthTools> = (args) => {
//   return <UserAuthTools {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import UserAuthTools from './UserAuthTools'

export const generated = () => {
  return <UserAuthTools />
}

export default {
  title: 'Components/UserAuthTools',
  component: UserAuthTools,
} as ComponentMeta<typeof UserAuthTools>

// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof WatchList> = (args) => {
//   return <WatchList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import WatchList from './WatchList'

export const generated = () => {
  return <WatchList />
}

export default {
  title: 'Components/WatchList',
  component: WatchList,
} as ComponentMeta<typeof WatchList>

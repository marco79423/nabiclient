import React from 'react'

import PublishPanel from './PublishPanel'


export default {
  title: 'modules/web/ControlPanel/PublishPanel',
  component: PublishPanel,
}


const Template = (args) => <PublishPanel {...args} />

export const Default = Template.bind({})
Default.args = {
}
import React from 'react'

import SubscribePanel from './SubscribePanel'


export default {
  title: 'modules/web/ControlPanel/SubscribePanel',
  component: SubscribePanel,
}


const Template = (args) => <SubscribePanel {...args} />

export const Default = Template.bind({})
Default.args = {}
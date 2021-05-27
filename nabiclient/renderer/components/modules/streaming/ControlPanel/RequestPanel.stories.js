import React from 'react'

import RequestPanel from './RequestPanel'


export default {
  title: 'modules/common/ControlPanel/RequestPanel',
  component: RequestPanel,
}


const Template = (args) => <RequestPanel {...args} />

export const Default = Template.bind({})
Default.args = {}

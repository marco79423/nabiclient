import React from 'react'
import TextFieldWithAction from './TextFieldWithAction'
import Button from './Button'


export default {
  title: 'elements/TextFieldWithAction',
  component: TextFieldWithAction,
}


const Template = (args) => <TextFieldWithAction {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: '搜尋訊息',
}

export const WithAction = Template.bind({})
WithAction.args = {
  ...Default.args,
  action: <Button link>產生連結</Button>
}

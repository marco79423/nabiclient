import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {changePublishMessageBody} from '../../../../../../../../../../redux/project'
import {selectPublishMessageBody} from '../../../../../../../../../../redux/selectors'
import TextArea from '../../../../../../../../../elements/TextArea'


const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 350,
    maxWidth: 500,
  },
}))


export default function RequestBody() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {t} = useTranslation()

  const requestBody = useSelector(selectPublishMessageBody)

  const onChange = (value) => {
    dispatch(changePublishMessageBody(value))
  }

  return (
    <TextArea
      className={classes.root}
      label="請求內容"
      value={requestBody}
      onChange={onChange}
    />
  )
}

RequestBody.propTypes = {}

import React from 'react'

import {makeStyles} from '@material-ui/core/styles'
import TextField from '../../../../../../../../../elements/TextField'
import {useDispatch, useSelector} from 'react-redux'
import {selectPublishChannel, selectSubscribeChannel} from '../../../../../../../../../../redux/selectors'
import {changePublishChannel, changeSubscribeChannel} from '../../../../../../../../../../redux/project'
import {PanelTab} from '../../../../../../../../../../constants'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    padding: theme.spacing(1),
  },
}))


export default function TopControlBar({mode}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const publishChannel = useSelector(selectPublishChannel)
  const subscribeChannel = useSelector(selectSubscribeChannel)

  const channel = React.useMemo(() => {
    switch (mode) {
      case PanelTab.Publish:
        return publishChannel
      case PanelTab.Subscribe:
        return subscribeChannel
    }
  }, [mode, publishChannel, subscribeChannel])

  const onChannelChange = (channel) => {
    switch (mode) {
      case PanelTab.Publish:
        dispatch(changePublishChannel(channel))
        return
      case PanelTab.Subscribe:
        dispatch(changeSubscribeChannel(channel))
        return
    }
  }

  return (
    <TextField
      className={classes.root}
      label={'頻道'}
      value={channel}
      onChange={onChannelChange}
    />
  )
}

TopControlBar.propTypes = {}

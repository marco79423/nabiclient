import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import {ConnectionState} from '../../../../../../../../../constants'
import {changeClientID, changeClusterID, changeConnectionUrl} from '../../../../../../../../../redux/project'
import {selectClientID, selectClusterID, selectConnectionUrl} from '../../../../../../../../../redux/selectors'
import TextField from '../../../../../../../../elements/TextField'
import {Grid, Paper} from '@material-ui/core'
import Button from '../../../../../../../../elements/Button'
import {useSTAN} from '../../../../../../../../../features/stans'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),

    borderTopLeftRadius: 0,
  },
  input: {
    fontSize: '1rem',
    padding: theme.spacing(1),
  },
  controlBar: {},
  requestBody: {
    flex: 1,
    marginTop: theme.spacing(1),
    maxHeight: 400,
  },
  bottomActions: {
    marginTop: theme.spacing(2),
  }
}))

export default function STANConnectionPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const stan = useSTAN()

  const url = useSelector(selectConnectionUrl)
  const clusterID = useSelector(selectClusterID)
  const clientID = useSelector(selectClientID)

  const [buttonLabel, setButtonLabel] = React.useState(('建立連線'))

  React.useEffect(() => {
    switch (stan.connectionState) {
      case ConnectionState.Idle:
        setButtonLabel('建立連線')
        return
      case ConnectionState.Connecting:
        setButtonLabel('連線中…')
        return
      case ConnectionState.Connected:
        setButtonLabel('關閉連線')
        return
      case ConnectionState.Closing:
        setButtonLabel('關閉中…')
        return
    }
  }, [stan.connectionState])


  const onUrlChange = (value) => {
    dispatch(changeConnectionUrl(value))
  }

  const onClusterIDChange = (value) => {
    dispatch(changeClusterID(value))
  }

  const onClientIDChange = (value) => {
    dispatch(changeClientID(value))
  }

  const onButtonClick = async () => {
    switch (stan.connectionState) {
      case ConnectionState.Idle:
        await stan.connect({url, clusterID, clientID})
        return
      case ConnectionState.Connected:
        await stan.disconnect()
        return
    }
  }

  const isValidUrl = true  // 暫時不檢查

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TextField
            className={classes.input}
            label={'欲連線的地址'}
            placeholder={'欲連線的地址'}
            value={url}
            onChange={onUrlChange}
            disabled={stan.connectionState !== ConnectionState.Idle}
            error={!isValidUrl}
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.input}
            label={'ClusterID'}
            placeholder={'ClusterID'}
            value={clusterID}
            onChange={onClusterIDChange}
            disabled={stan.connectionState !== ConnectionState.Idle}
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.input}
            label={'ClientID'}
            placeholder={'ClientID'}
            value={clientID}
            onChange={onClientIDChange}
            disabled={stan.connectionState !== ConnectionState.Idle}
          />

        </Grid>
      </Grid>
      <Grid className={classes.bottomActions} container justifyContent="space-between">
        <Grid item>
        </Grid>
        <Grid item>
          <Button
            primary
            large
            disabled={(stan.connectionState === ConnectionState.Connecting || stan.connectionState === ConnectionState.Closing) || !isValidUrl}
            onClick={onButtonClick}
          >{buttonLabel}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

STANConnectionPanel.propTypes = {}

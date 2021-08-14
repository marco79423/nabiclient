import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Paper} from '@material-ui/core'
import ConnectionPanel from './ConnectionPanel'
import RequestPanel from './RequestPanel'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(3),
    height: '100%',
    maxWidth: 500,
  },
  connectionPanel: {},
  requestPanel: {
    marginTop: theme.spacing(3),
  },
}))

export default function ControlPanel() {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container direction="column" component={Paper} elevation={1} square>
      <Grid className={classes.connectionPanel} item>
        <ConnectionPanel/>
      </Grid>
      <Grid className={classes.requestPanel} item>
        <RequestPanel/>
      </Grid>
    </Grid>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.project.page.main.controlPanel.background,
    padding: theme.spacing(3),
    height: '100%',
  },
  connectionPanel: {
    marginTop: theme.spacing(1),
  },
  requestPanel: {
    marginTop: theme.spacing(4),
  },
}))

export default function ControlPanel({connectionPanel, requestPanel}) {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={1} square>
      <div className={classes.connectionPanel}>
        {connectionPanel}
      </div>
      <div className={classes.requestPanel}>
        {requestPanel}
      </div>
    </Paper>
  )
}

ControlPanel.propTypes = {
  connectionPanel: PropTypes.element.isRequired,
  requestPanel: PropTypes.element.isRequired,
}

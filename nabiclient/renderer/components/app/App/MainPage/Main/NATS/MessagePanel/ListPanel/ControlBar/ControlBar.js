import React, {useRef} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import MessageSearch from './MessageSearch'
import ClearAllButton from './ClearAllButton'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.project.page.main.listPanel.controlBar.background,
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))


export default function ControlBar() {
  const ref = useRef()
  const classes = useStyles()

  return (
    <Grid ref={ref} className={classes.root} container justifyContent="space-between" alignItems="center">
      <Grid item xs>
        <MessageSearch/>
      </Grid>
      <Grid item>
        <ClearAllButton/>
      </Grid>
    </Grid>
  )
}

ControlBar.propTypes = {}

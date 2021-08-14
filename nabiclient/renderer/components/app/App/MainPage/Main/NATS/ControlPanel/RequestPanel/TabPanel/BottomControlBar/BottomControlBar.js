import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Grid} from '@material-ui/core'

import {PanelTab} from '../../../../../../../../../../constants'
import SendRequestButton from './SendRequestButton'
import SubscribeButton from './SubscribeButton'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
}))


export default function BottomControlBar({mode}) {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container justifyContent="space-between">
      <Grid item>
      </Grid>

      {mode === PanelTab.Publish ? (
        <Grid item>
          <SendRequestButton/>
        </Grid>
      ) : null}

      {mode === PanelTab.Subscribe ? (
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
            </Grid>
            <Grid item>
              <SubscribeButton/>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  )
}

BottomControlBar.propTypes = {
  mode: PropTypes.oneOf([
    PanelTab.Publish,
    PanelTab.Subscribe,
  ])
}

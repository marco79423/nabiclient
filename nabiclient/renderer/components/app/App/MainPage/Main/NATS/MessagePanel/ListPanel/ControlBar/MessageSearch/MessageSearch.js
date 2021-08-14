import React from 'react'
import {useDispatch} from 'react-redux'
import {nanoid} from 'nanoid'

import {makeStyles} from '@material-ui/core/styles'
import {addSearchQuery} from '../../../../../../../../../../redux/current'
import SearchField from '../../../../../../../../../elements/SearchField'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
}))


export default function MessageSearch() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const onClick = (value) => {
    dispatch(addSearchQuery({
      id: nanoid(),
      value: value,
    }))
  }

  return (
    <SearchField
      className={classes.root}
      placeholder={'搜尋訊息'}
      onSearch={onClick}
      buttonLabel={'搜尋'}
    />
  )
}

MessageSearch.propTypes = {}

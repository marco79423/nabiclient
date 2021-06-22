import React from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../../../../constants'
import {getProjectState} from '../../../../redux/selectors'
import ControlPanelContainer from '../ControlPanelContainer'
import ListPanelContainer from '../../common/ListPanelContainer'
import DetailPanelContainer from '../../common/DetailPanelContainer'
import Main from '../../../modules/common/Main'

export default function MainContainer({appController}) {
  const projectState = useSelector(getProjectState)
  const appMode = appController.getAppMode()

  return (
    <Main
      appMode={appMode}
      changeAppMode={appController.changeAppMode}
      loading={projectState === LoadingState.Loading}
      controlPanel={<ControlPanelContainer appController={appController}/>}
      listPanel={<ListPanelContainer appController={appController}/>}
      detailPanel={<DetailPanelContainer appController={appController}/>}
    />
  )
}

import React from 'react'
import {Provider} from 'react-redux'
import {ThemeProvider} from '@material-ui/core/styles'

import theme from '../../components/themes/defaultTheme'
import store from '../../redux/store'
import ProviderComposer, {provider} from '../../components/elements/ProviderCompose'
import {NotificationsProvider} from '../notifications'
import {NATSProvider} from '../nats'
import {STANProvider} from '../stans'


/**
 * 所有 App 所需的 Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function AppProvider({children}) {
  return (
    <ProviderComposer providers={[
      // Material-UI 的 Theme Provider
      provider(ThemeProvider, {theme}),
      // Redux 的 Provider
      provider(Provider, {store}),
      // 通知的 Provider (提供 Popup 訊息的功能)
      provider(NotificationsProvider),
      // NATS 相關功能的 Provider
      provider(NATSProvider),
      // NATS Streaming 相關功能的 Provider
      provider(STANProvider),
    ]}>
      {children}
    </ProviderComposer>
  )
}

export default AppProvider

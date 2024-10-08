import styled from 'lib/styled-components'
import { GRID_AREAS } from 'pages/App/utils/shared'
import { memo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Z_INDEX } from 'theme/zIndex'
import { Text } from 'ui/src'
import { XIcon } from './XIcon'
import { DextoolsIcon } from './DextoolsIcon'
import { TelegramIcon } from './TelegramIcon'

const AppFooter = styled.div`
  grid-area: ${GRID_AREAS.HEADER};
  width: 100vw;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: ${Z_INDEX.sticky};
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-top:30px;
`

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #00071b;
  border-radius: 16px 16px 0px 0px;
  padding:15px;
  padding-left:30px;
  padding-right:30px;
  min-width:300px;
  max-width:25vw;
  flex-grow:1;
`

export const Footer = memo(function Footer() {
  const { pathname } = useLocation()

  const handleDextoolsClick = useCallback(() => {
    window.open('https://www.dextools.io/app/en/ether/pair-explorer/0xfedd9bc3afb9a53d8d4aa2eccfbf5904e26f7f7a', '_blank')
  }, [])

  const handleXClick = useCallback(() => {
    window.open('https://x.com/theboostcoin', '_blank')
  }, [])

  const handleTelegramClick = useCallback(() => {
    window.open('https://t.me/BoostCoinOfficial', '_blank')
  }, [])

  return (
    <AppFooter id="AppFooter">
      <Socials>
        <DextoolsIcon onClick={handleDextoolsClick} width="31" height="30"/>
        <XIcon onClick={handleXClick} width="35" height="30"/>
        <TelegramIcon onClick={handleTelegramClick} width="38" height="30"/>
      </Socials>
    </AppFooter>
  )
})

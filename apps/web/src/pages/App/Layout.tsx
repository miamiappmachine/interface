import { PageTabs } from 'components/NavBar/LEGACY'
import { MobileBottomBarLegacy } from 'components/NavBar/MobileBottomBar'
import styled from 'lib/styled-components'
import { Body } from 'pages/App/Body'
import { Header } from 'pages/App/Header'
import { GRID_AREAS } from 'pages/App/utils/shared'
import { BREAKPOINTS } from 'theme'
import { Z_INDEX } from 'theme/zIndex'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks'
import { Footer } from './Footer'
import BACKGROUND_IMAGE from '../../assets/images/background.png'

const AppContainer = styled.div`
  min-height: 100vh;

  // grid container settings
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas: '${GRID_AREAS.HEADER}' '${GRID_AREAS.MAIN}' '${GRID_AREAS.MOBILE_BOTTOM_BAR}';
`

const ImageBackground = styled.img`
  max-width: 100vw;
  max-height:90vh;
  position: absolute;
  bottom:0;
  left:0;
`

const AppBody = styled.div`
  grid-area: ${GRID_AREAS.MAIN};
  width: 100vw;
  min-height: 90vh;
  max-width: ${({ theme }) => `${theme.maxWidth}px`};
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  flex: 1;
  position: relative;
  margin: auto;
  padding-bottom:70px;

  @media screen and (max-width: ${BREAKPOINTS.sm}px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`

const BodyWrapper = styled.div`
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
`

const MobileBar = styled.div`
  width: 100vw;
  position: absolute;
  bottom: 0px;
  z-index: ${Z_INDEX.sticky};
`

export function AppLayout() {
  const isLegacyNav = !useFeatureFlag(FeatureFlags.NavRefresh)

  return (
    <>
    <AppContainer>
      <Header />
      <AppBody>
        <ImageBackground src={BACKGROUND_IMAGE}/>
        <BodyWrapper>
          <Body />
        </BodyWrapper>
      </AppBody>
      <MobileBar>
        {isLegacyNav && (
          <MobileBottomBarLegacy>
            <PageTabs />
          </MobileBottomBarLegacy>
        )}
      </MobileBar>
    </AppContainer>
    <Footer />
    </>
  )
}

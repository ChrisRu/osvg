import React, { useState, useEffect } from 'react'
import { MenuBar } from './MenuBar'
import { SVGRenderer } from './SVGRenderer'
import { carSvg } from '../images/car'
import { Sidebar } from './Sidebar'
import styled from 'styled-components'
import { CodeRenderer } from './CodeRenderer'
import * as worker from '../services/svgo.worker'
import { Overlay } from './Overlay'
import { plugins } from '../services/svgoOptions'
import { PluginConfig } from 'svgo'

const Main = styled.main`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  overflow: hidden;
`

export function App() {
  const [view, setView] = useState<'svg' | 'code'>('svg')
  const [SVGContent, setSVGContent] = useState<string>()
  const [userSettings, setUserSettings] = useState<{ [pluginId: string]: boolean }>({})
  const [optimizedSVGContent, setOptimizedSVGContent] = useState<string>()

  useEffect(() => {
    setSVGContent(carSvg)
  }, [])

  useEffect(() => {
    if (SVGContent) {
      ;(async function() {
        const settings = Object.values(JSON.parse(JSON.stringify(plugins)) as typeof plugins).flat()

        Object.keys(userSettings).forEach(key => {
          const setting = settings.find(setting => setting.id === key)
          if (setting) {
            setting.default = userSettings[key]
          }
        })

        const userPlugins = (settings
          .filter(setting => setting.default)
          .map(setting => setting.id) as unknown) as PluginConfig[]
        const result = await worker.SVGOWorker(SVGContent, userPlugins, 3)
        setOptimizedSVGContent(result)
      })()
    }
  }, [SVGContent, userSettings])

  function onError(error: any) {
    console.error(error)
  }

  return (
    <>
      <MenuBar onLoadSVG={setSVGContent} onChangeView={setView} />
      <Main>
        <Sidebar userSettings={userSettings} onSettingsUpdate={setUserSettings} />
        <Overlay before={SVGContent} after={optimizedSVGContent} />
        {view === 'svg' ? (
          <SVGRenderer SVGContent={optimizedSVGContent} onLoadError={onError} />
        ) : (
          <CodeRenderer SVGContent={optimizedSVGContent} />
        )}
      </Main>
    </>
  )
}

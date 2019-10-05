import React, { useState, useEffect } from 'react'
import { MenuBar } from './MenuBar'
import { SVGRenderer } from './SVGRenderer'
import { dogSvg } from '../images/dog'
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
  const [error, setError] = useState<Error>()

  useEffect(() => {
    setSVGContent(dogSvg)
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

        try {
          const result = await worker.SVGOWorker(SVGContent, userPlugins, true, 3)
          setOptimizedSVGContent(result)
        } catch (error) {
          setError(error)
        }
      })()
    }
  }, [SVGContent, userSettings])

  return (
    <>
      <MenuBar onLoadSVG={setSVGContent} onChangeView={setView} />
      <Main>
        {SVGContent === undefined ? (
          <span>Please upload a valid SVG</span>
        ) : error !== undefined ? (
          <span>Failed loading image</span>
        ) : (
          <>
            <Sidebar userSettings={userSettings} onSettingsUpdate={setUserSettings} />
            <Overlay before={SVGContent} after={optimizedSVGContent} />
            {view === 'svg' ? (
              <SVGRenderer
                SVGContent={optimizedSVGContent}
                onLoadError={() => setError(new Error('Failed rendering SVG'))}
              />
            ) : (
              <CodeRenderer SVGContent={optimizedSVGContent} />
            )}
          </>
        )}
      </Main>
    </>
  )
}

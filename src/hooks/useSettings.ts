import { useState, useEffect } from 'react'
import * as R from 'ramda'
import { defaultSettings, ISetting, ISettings } from '../services/svgoSettings'

const savedSettingsKey = 'svgo-online@settings'

function saveSettings(settings?: ISettings) {
  localStorage.setItem(savedSettingsKey, JSON.stringify(settings))
}

function getSavedSettings(): ISettings | undefined {
  const savedSettingsString = localStorage.getItem(savedSettingsKey)
  if (!savedSettingsString) {
    return undefined
  }

  try {
    const savedSettings: ISettings = JSON.parse(savedSettingsString)

    return {
      prettify: savedSettings.prettify || defaultSettings.prettify,
      precision: savedSettings.precision || defaultSettings.precision,
      plugins: savedSettings.plugins
        ? defaultSettings.plugins.reduce<ISetting[]>((totalPlugins, nextPlugin) => {
            const savedPlugin = savedSettings.plugins.find(
              plugin => nextPlugin.description === plugin.description,
            )
            totalPlugins.push(savedPlugin ? { ...nextPlugin, ...savedPlugin } : nextPlugin)
            return totalPlugins
          }, [])
        : defaultSettings.plugins,
    }
  } catch (error) {
    console.error('Could not load saved settings', error)
    saveSettings(undefined)
    return undefined
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<ISettings>({
    plugins: [],
    precision: 3,
    prettify: false,
  })

  function updateSetting(setting: ISetting) {
    const settingLens = R.lensIndex(
      R.findIndex(R.propEq('description', setting.description))(settings.plugins),
    )
    setSettings(R.set(settingLens, setting))
  }

  function togglePrettify() {
    setSettings(prevState => ({
      ...prevState,
      prettify: !prevState.prettify,
    }))
  }

  function setPrecision(precision: number) {
    setSettings(prevState => ({
      ...prevState,
      precision,
    }))
  }

  useEffect(() => {
    const savedSettings = getSavedSettings()
    setSettings(savedSettings || defaultSettings)
  }, [])

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  return {
    settings,
    updateSetting,
    togglePrettify,
    setPrecision,
  }
}

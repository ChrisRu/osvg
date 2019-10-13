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
      ...defaultSettings,
      ...savedSettings,
      plugins: defaultSettings.plugins.map(defaultPlugin => {
        const savedPlugin = savedSettings.plugins.find(plugin => defaultPlugin.id === plugin.id)
        return { ...defaultPlugin, value: (savedPlugin || defaultPlugin).value }
      }),
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
    setSettings(settings => ({
      precision: settings.precision,
      prettify: settings.prettify,
      plugins: R.set(settingLens, setting, settings.plugins),
    }))
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

import { useState, useEffect, useCallback } from 'react'
import { defaultSettings, ISetting, ISettings } from '../services/svgoSettings'
import { updateAtIndex } from '../util/immutableHelperMethods'

const savedSettingsKey = 'osvg@settings'

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
      plugins: defaultSettings.plugins.map((defaultPlugin) => {
        const savedPlugin = savedSettings.plugins.find((plugin) => defaultPlugin.id === plugin.id)
        return { ...defaultPlugin, value: (savedPlugin || defaultPlugin).value }
      }),
    }
  } catch (error) {
    console.error('Could not load saved settings', error)
    saveSettings(undefined)
    return undefined
  }
}

const savedSettings = getSavedSettings() || defaultSettings

export function useSettings() {
  const [plugins, setPlugins] = useState<ISetting[]>(() => savedSettings.plugins)
  const [precision, setPrecision] = useState(() => savedSettings.precision)
  const [prettify, setPrettify] = useState(() => savedSettings.prettify)

  const updatePlugin = useCallback((newPlugin: ISetting) => {
    setPlugins((plugins) => {
      const pluginIndex = plugins.findIndex((plugin) => plugin.id === newPlugin.id)
      return updateAtIndex(pluginIndex, newPlugin, plugins)
    })
  }, [])

  const togglePrettify = useCallback(() => {
    setPrettify((prettify) => !prettify)
  }, [])

  useEffect(() => {
    if (
      savedSettings.plugins !== plugins ||
      savedSettings.precision !== precision ||
      savedSettings.prettify !== prettify
    ) {
      saveSettings({ plugins, precision, prettify })
    }
  }, [plugins, precision, prettify])

  return {
    plugins,
    precision,
    prettify,
    togglePrettify,
    updatePlugin,
    setPrecision,
  }
}

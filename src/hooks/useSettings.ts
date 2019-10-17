import { useState, useEffect } from 'react'
import { defaultSettings, ISetting, ISettings } from '../services/svgoSettings'
import { update } from '../util/immutableHelperMethods'

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
  const [plugins, setPlugins] = useState<ISetting[]>([])
  const [precision, setPrecision] = useState(3)
  const [prettify, setPrettify] = useState(false)

  function updatePlugin(newPlugin: ISetting) {
    setPlugins(plugins => {
      const pluginIndex = plugins.findIndex(plugin => plugin.id === newPlugin.id)
      return update(pluginIndex, newPlugin, plugins)
    })
  }

  function togglePrettify() {
    setPrettify(prettify => !prettify)
  }

  useEffect(() => {
    const { plugins, prettify, precision } = getSavedSettings() || defaultSettings
    setPlugins(plugins)
    setPrettify(prettify)
    setPrecision(precision)
  }, [])

  useEffect(() => {
    saveSettings({ plugins, precision, prettify })
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

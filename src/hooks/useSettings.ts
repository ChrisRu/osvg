import { useState, useEffect } from 'react'
import * as R from 'ramda'
import { defaultSettings, ISetting } from '../services/svgoSettings'

const savedSettingsKey = 'svgo-online@settings'

function saveSettings(settings?: ISetting[]) {
  localStorage.setItem(savedSettingsKey, JSON.stringify(settings))
}

function getSavedSettings() {
  const savedSettingsString = localStorage.getItem(savedSettingsKey)
  if (!savedSettingsString) {
    return undefined
  }

  try {
    const savedSettings = JSON.parse(savedSettingsString)
    const mergedSettings = R.values(
      R.mergeWith(R.mergeRight, defaultSettings, savedSettings),
    ) as ISetting[]
    return mergedSettings
  } catch (error) {
    console.error('Could not load saved settings', error)
    saveSettings(undefined)
    return undefined
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<ISetting[]>([])

  function updateSetting(setting: ISetting) {
    const settingLens = R.lensIndex(
      R.findIndex(R.propEq('description', setting.description))(settings),
    )
    setSettings(R.set(settingLens, setting))
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
  }
}

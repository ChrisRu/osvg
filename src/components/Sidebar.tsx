import React from 'react'
import styled from 'styled-components'
import { plugins } from '../services/svgoOptions'

const settings = Object.values(plugins).reduce((total, next) => {
  return total.concat(...next)
}, [])

const SidebarWrapper = styled.div`
  background: #000;
  color: #fff;
  max-width: 400px;
  padding: 0.5rem;
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
`

const OptionGroup = styled.div``

const OptionTitle = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
`

const Options = styled.div``

const Option = styled.label`
  display: block;
  padding: 0.2rem 0.5rem;
  display: flex;
  align-items: center;

  input {
    margin-right: 0.5rem;
  }
`

interface IProps {
  userSettings: { [pluginId: string]: boolean }
  onSettingsUpdate: (settings: { [pluginId: string]: boolean }) => void
}

export function Sidebar({ userSettings, onSettingsUpdate }: IProps) {
  function getCurrentValue(plugin: { name: string; id: string; default: boolean }) {
    return userSettings[plugin.id] === undefined ? plugin.default : userSettings[plugin.id]
  }

  function toggleSetting(pluginId: string) {
    const setting = settings.find(setting => setting.id === pluginId)
    if (setting && setting.default !== undefined) {
      const currentValue = getCurrentValue(setting)
      onSettingsUpdate({
        ...userSettings,
        [pluginId]: !currentValue,
      })
    }
  }

  return (
    <SidebarWrapper>
      {Object.entries(plugins).map(([header, plugins]) => (
        <OptionGroup key={header}>
          <OptionTitle>{header}</OptionTitle>
          <Options>
            {plugins.map(plugin => (
              <Option key={plugin.id}>
                <input
                  type="checkbox"
                  onChange={() => toggleSetting(plugin.id)}
                  checked={getCurrentValue(plugin)}
                />
                <span>{plugin.name}</span>
              </Option>
            ))}
          </Options>
        </OptionGroup>
      ))}
    </SidebarWrapper>
  )
}

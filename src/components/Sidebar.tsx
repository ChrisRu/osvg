import React from 'react'
import styled from 'styled-components'
import { plugins, IPlugin } from '../services/svgoOptions'

const settings = Object.values(plugins).reduce((total, next) => {
  return total.concat(...next)
}, [])

const SidebarWrapper = styled.div`
  background: #181818;
  color: #fff;
  max-width: 400px;
  padding: 1rem;
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
`

const OptionGroup = styled.div`
  margin-bottom: 1rem;
`

const OptionTitle = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
`

const Options = styled.div``

const Option = styled.label`
  display: block;
  padding: 0.4rem 0.5rem;
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
  function getCurrentValue(plugin: IPlugin) {
    return userSettings[plugin.id] === undefined ? plugin.default : userSettings[plugin.id]
  }

  function toggleSetting(plugin: IPlugin) {
    const setting = settings.find(setting => setting.id === plugin.id)
    if (setting && setting.default !== undefined) {
      const currentValue = getCurrentValue(setting)
      onSettingsUpdate({
        ...userSettings,
        [plugin.id]: !currentValue,
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
                  onChange={() => toggleSetting(plugin)}
                  checked={getCurrentValue(plugin)}
                />
                <span title={plugin.id}>{plugin.description}</span>
              </Option>
            ))}
          </Options>
        </OptionGroup>
      ))}
    </SidebarWrapper>
  )
}

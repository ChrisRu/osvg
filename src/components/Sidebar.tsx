import React from 'react'
import styled from 'styled-components'
import { ISetting } from '../services/svgoSettings'
import { capitalize } from '../services/stringTransformService'
import { Checkbox } from './elements/Checkbox'

const SidebarWrapper = styled.div`
  background: #181818;
  color: #efefef;
  max-width: 400px;
  padding: 1rem;
  max-height: 100%;
  overflow-y: auto;
`

const OptionGroup = styled.div`
  margin-bottom: 1rem;
`

const OptionGroupTitle = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
  color: #fff;
`

const OptionGroupOptions = styled.div``

const Option = styled.label`
  display: block;
  padding: 0.4rem 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  input {
    margin-right: 0.5rem;
  }
`

const OptionRange = styled.div`
  display: block;
  padding: 0.4rem 2rem 0.4rem;
  display: flex;
  align-items: center;
  max-width: 90%;
  margin-bottom: 0.4rem;

  input {
    flex: 1;
    background: transparent;

    &::-moz-range-track {
      background-color: #ccc;
    }
  }
`

const OptionTitle = styled.span`
  display: block;
  margin-top: 1rem;
  padding-left: 2rem;
`

const OptionRangeValue = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 1rem;
`

interface IProps {
  plugins: ISetting[]
  precision: number
  prettify: boolean
  onUpdatePlugin: (setting: ISetting) => void
  togglePrettify: () => void
  setPrecision: (value: number) => void
}

export function Sidebar({
  plugins,
  prettify,
  precision,
  togglePrettify,
  setPrecision,
  onUpdatePlugin,
}: IProps) {
  const groupedSettings = plugins.reduce<{ [key: string]: ISetting[] }>((total, setting) => {
    if (setting.category in total) {
      total[setting.category].push(setting)
    } else {
      total[setting.category] = [setting]
    }
    return total
  }, {})

  return (
    <SidebarWrapper>
      {Object.entries(groupedSettings).map(([header, plugins]) => (
        <OptionGroup key={header}>
          <OptionGroupTitle>
            {header
              .split(' ')
              .map(capitalize)
              .join(' ')}
          </OptionGroupTitle>
          {header === 'rounding' ? (
            <>
              <OptionTitle>Precision</OptionTitle>
              <OptionRange>
                <input
                  type="range"
                  min="0"
                  max="16"
                  value={precision}
                  onChange={event => setPrecision(Number(event.target.value))}
                />
                <OptionRangeValue>{precision}</OptionRangeValue>
              </OptionRange>
            </>
          ) : null}
          {header === 'pretty code' ? (
            <OptionGroupOptions>
              <Option>
                <Checkbox checked={prettify} onChange={togglePrettify} />
                <span>Prettify</span>
              </Option>
            </OptionGroupOptions>
          ) : null}
          <OptionGroupOptions>
            {plugins.map(plugin => (
              <Option key={plugin.description}>
                <Checkbox
                  onChange={() => onUpdatePlugin({ ...plugin, value: !plugin.value })}
                  checked={plugin.value}
                />
                <span>{plugin.description}</span>
              </Option>
            ))}
          </OptionGroupOptions>
        </OptionGroup>
      ))}
    </SidebarWrapper>
  )
}

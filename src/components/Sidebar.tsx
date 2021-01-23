import { useState, Fragment } from 'react'
import styled from 'styled-components/macro'
import { ISetting } from '../services/svgoSettings'
import { capitalize } from '../services/stringTransformService'
import { Checkbox } from './elements/Checkbox'
import { SearchIcon } from './elements/Icons'

const SidebarWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 420px;
  padding: 1rem;
  color: #efefef;
  background: #181818;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`

const SearchIconWrapper = styled(SearchIcon)`
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  padding: 0.5rem;
`

const SearchInput = styled.input<{ hasValue?: boolean }>`
  background: rgba(255, 255, 255, ${(p) => (p.hasValue ? 0.2 : 0)});
  color: #fff;
  border: 0;
  border-radius: 0;
  padding: 0.5rem 1rem 0.5rem 2.2rem;
  width: 100%;
  box-sizing: border-box;
  transition: background 0.1s;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.2);
  }
`

const OptionGroup = styled.div`
  margin-bottom: 1.5rem;
`

const OptionGroupTitle = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
  color: #fff;
`

const Option = styled.label<{ opaque?: boolean }>`
  display: block;
  padding: 0.4rem 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);

    span {
      opacity: 1;
    }
  }

  span {
    opacity: ${(p) => (p.opaque ? 0.7 : 1)};
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

interface ISettingBoolean extends ISetting {
  type: 'boolean'
  update: () => void
  value: boolean
}

interface ISettingRange extends ISetting {
  type: 'range'
  min: number
  max: number
  step?: number
  value: number
  update: (value: number) => void
}

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
  const [search, setSearch] = useState('')
  const searchQuery = search.toLowerCase().trim()

  const groupedSettings = Object.entries(
    plugins.reduce<{ [category: string]: (ISettingBoolean | ISettingRange)[] }>(
      (total, setting) => {
        const settingWithUpdate = {
          ...setting,
          type: 'boolean',
          update: (value: boolean) => onUpdatePlugin({ ...setting, value }),
        } as ISettingBoolean

        if (setting.category in total) {
          total[setting.category].push(settingWithUpdate)
        } else {
          total[setting.category] = [settingWithUpdate]
        }

        return total
      },
      {
        'pretty code': [
          {
            description: 'Prettify',
            id: '-',
            value: prettify,
            category: 'pretty code',
            type: 'boolean',
            update: togglePrettify,
          },
        ],
        rounding: [
          {
            description: 'Precision',
            id: '-',
            value: precision,
            category: 'rounding',
            type: 'range',
            min: 0,
            max: 16,
            update: (value: number) => setPrecision(value),
          },
        ],
      },
    ),
  )

  return (
    <SidebarWrapper>
      <SearchWrapper>
        <SearchIconWrapper />
        <SearchInput
          value={search}
          hasValue={search.length > 0}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search..."
        />
      </SearchWrapper>
      {groupedSettings.length ? (
        groupedSettings.map(([header, plugins]) => {
          const filteredPlugins = plugins.filter(
            (setting) =>
              !(
                !setting.description.toLowerCase().includes(searchQuery) &&
                !setting.id.toLowerCase().includes(searchQuery)
              ),
          )

          if (filteredPlugins.length === 0) {
            return null
          }

          return (
            <OptionGroup key={header}>
              <OptionGroupTitle>{header.split(' ').map(capitalize).join(' ')}</OptionGroupTitle>
              {filteredPlugins.map((plugin) =>
                plugin.type === 'boolean' ? (
                  <Option opaque={!plugin.value} key={plugin.description} title={plugin.id}>
                    <Checkbox onChange={plugin.update} checked={plugin.value} />
                    <span>{plugin.description}</span>
                  </Option>
                ) : plugin.type === 'range' ? (
                  <Fragment key={plugin.description}>
                    <OptionTitle>{plugin.description}</OptionTitle>
                    <OptionRange>
                      <input
                        type="range"
                        min={plugin.min}
                        max={plugin.max}
                        value={plugin.value}
                        onChange={(event) => plugin.update(Number(event.target.value))}
                      />
                      <OptionRangeValue>{precision}</OptionRangeValue>
                    </OptionRange>
                  </Fragment>
                ) : null,
              )}
            </OptionGroup>
          )
        })
      ) : (
        <p>No settings found...</p>
      )}
    </SidebarWrapper>
  )
}

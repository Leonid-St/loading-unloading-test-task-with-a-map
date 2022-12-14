import { Map } from 'leaflet'
import React from 'react'

const MenuButton = (props: IMenuButton) => {
  const icon =
    props.icon === 'string' ? <i className={props.icon} /> : props.icon
  const active = props.id === props.selected && !props.collapsed ? ' active' : ''
  const disabled = props.disabled ? ' disabled' : ''

  const onClick = (e: React.SyntheticEvent, id: string) => {
    if (!props.disabled) {
      if (props.collapsed) {
        props.onOpen(e, id)
      } else {
        if (props.selected === id) {
          props.onClose(e)
        } else {
          props.onOpen(e, id)
        }
      }
    }
  }

  return (
    <li className={active + disabled} key={props.id}>
      <button
        className="sidebar-tab-button"
        role='tab'
        onClick={e => onClick(e, props.id)}>{' '}{icon}
      </button>
    </li>
  )
}


interface IMenuButton {
  id: string;
  icon: string | JSX.Element;
  disabled: boolean;
  selected: string | boolean;
  onOpen: Function;
  onClose: Function;
  collapsed: boolean;
  map:Map;
}

export default MenuButton

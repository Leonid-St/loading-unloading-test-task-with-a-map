import React, { ReactElement } from 'react'
import { IconType } from 'react-icons/lib';

export interface ITab {
  id: string;
  header?: string;
  children: Function | JSX.Element | Object | Array<React.ReactNode> | React.ReactNode | any
  onClose?: ()=> void,
  active: boolean;
  icon : IconType | ReactElement<any, any>;
}

const Tab  = (props : ITab) => {
  const active = props.active ? ' active' : ''
  const closeIcon = CloseIconSelector((props as any))

  return (
    <div id={props.id} className={`sidebar-pane${active}`}>
      <h1 className='sidebar-header'>
        {props.header}
        <div
          className='sidebar-close'
          role='button'
          onClick={props.onClose}
        >{closeIcon}
        </div>
      </h1>
      {props.children}
    </div>
  )
}
interface ICloseIconSelector{
  closeIcon:string |  JSX.Element;
  position: 'left'|  'right';
}

const CloseIconSelector = ( props :ICloseIconSelector)  => {
  switch (typeof props.closeIcon) {
    case 'string':
      return <i className={props.closeIcon} />
    case 'object':
      return props.closeIcon
    default:
      return props.position === 'right' ? (
        <i className='fa fa-caret-right' />
      ) : (
        <i className='fa fa-caret-left' />
      )
  }
}



export default Tab

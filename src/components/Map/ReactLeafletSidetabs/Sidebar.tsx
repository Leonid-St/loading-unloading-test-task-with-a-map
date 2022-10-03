import React, { useEffect } from 'react'
// import { PropTypes } from 'prop-types'
import MenuButton from './MenuButton'
import './sidebar.scss'


const breakpoints = [
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-s'), 10),
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-m'), 10),
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-l'), 10),
]

const widths = [
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--leaflet-sidetabs-width-s'), 10),
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--leaflet-sidetabs-width-m'), 10),
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--leaflet-sidetabs-width-l'), 10),
]

interface ISidebar {
  id: string;
  map: Object;
  collapsed: boolean;
  position: 'left' | 'right';
  selected: string | boolean;
  closeIcon: string | JSX.Element;
  onClose: Function
  onOpen: Function,
  children: any;
  panMapOnChange: boolean;
  rehomeControls: boolean;
}




const Sidebar: React.FC<ISidebar> = ({
  id,
  map,
  collapsed,
  position,
  selected,
  closeIcon,
  onClose,
  onOpen,
  children,
  panMapOnChange,
  rehomeControls,
}: ISidebar, rootElement) => {
  useEffect(() => {

    if (rehomeControls) {

      const selector = `.leaflet-${position}`
      const controls = document.querySelectorAll(selector)
      const topControl = document.querySelector(`.leaflet-top${selector}`)
      const bottomControl = document.querySelector(`.leaflet-bottom${selector}`)

      topControl?.classList.add(`rehomed-top-${position}`)
      bottomControl?.classList.add(`rehomed-bottom-${position}`)

      // Exception: Attribution control should not ever be rehomed (in my opinion):
      const attributionControl = document.querySelector(`${selector} .leaflet-control-attribution`)
      if (attributionControl) {

        const backupOriginalHome = document.createElement('div')
        const leafletControlContainer = document.querySelector('.leaflet-control-container')
        backupOriginalHome.classList.add(`leaflet-${position}`)
        backupOriginalHome.classList.add('leaflet-bottom')
        backupOriginalHome.appendChild(attributionControl)
        leafletControlContainer?.appendChild(backupOriginalHome)

      }

      controls.forEach(control => rootElement?.appendChild(control))

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCloseFun = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClose) {
      onClose(e)
    }
    if (panMapOnChange) {
      if (map) {
        const offset = getOffset();
        if (offset)
          (map as any).panBy([offset / 2, 0], { duration: 0.5 })
      } else {
        console.error(`react-leaflet-sidetabs: 'panMapOnChange' prop requires that 'map' prop is provided, 'map' prop not provided`)
      }
    }
  }

  const onOpenFun = (e: any, tabid: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (onOpen) {
      onOpen(tabid)
    }
    if (panMapOnChange && collapsed) {
      if (map) {
        const offset = getOffset();
        if (offset)
          (map as any).panBy([-offset / 2, 0], { duration: 0.5 })
      } else {
        console.error(`react-leaflet-sidetabs: 'panMapOnChange' prop requires that 'map' prop is provided, 'map' prop not provided`)
      }
    }
  }

  const getOffset = () => {
    const windowSize = window.innerWidth
    let offset;
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (windowSize > breakpoints[i] && windowSize <= breakpoints[i + 1]) {
        offset = widths[i] / 2
      }
    }
    if (windowSize > breakpoints[breakpoints.length - 1]) {
      offset = widths[widths.length - 1] / 2
    }
    return position === "left" && offset ? -offset : undefined;

  }

  const renderPanes = (children: any) => {
    return React.Children.map(children, p => {
      return React.cloneElement(p, {
        onClose: onCloseFun,
        closeIcon: closeIcon,
        active: p.props.id === selected,
        position: position || 'left'
      })
    }

    )
  }

  const localPosition = ` sidebar-${position || 'left'}`
  const localCollapsed = collapsed ? ' collapsed' : ''
  const tabs = React.Children.toArray(children)
  const bottomtabs = tabs.filter(t => (t as any)?.anchor === 'bottom')
  const toptabs = tabs.filter(t => (t as any)?.anchor !== 'bottom')
  console.log(tabs);


  return (

    <div
      id={id || 'leaflet-sidebar'}
      className={`sidebar leaflet-touch${localPosition}${localCollapsed}`}
      ref={el => {
        rootElement = el
      }}
      style={{height:"100%",}}
    >
      <div className='sidebar-tabs'>
        <ul role='tablist'>
          {toptabs.map((t: any) => {
            console.log(t)
            return <MenuButton
              key={t.props.id}
              id={t.props.id}
              icon={t.props.icon}
              disabled={t.props.disabled}
              selected={selected}
              collapsed={collapsed}
              onClose={onCloseFun}
              onOpen={onOpenFun}
              map={map || null} />
          })}
        </ul>
        <ul role='tablist'>
          {bottomtabs.map((t: any) =>
            <MenuButton
              key={t.props.id}
              id={t.props.id}
              icon={t.props.icon}
              disabled={t.props.disabled}
              selected={selected}
              collapsed={collapsed}
              onClose={onCloseFun}
              onOpen={onOpenFun}
              map={map || null} />)}
        </ul>
      </div>
      <div className='sidebar-content'>
        {renderPanes(children)}
      </div>
    </div>

  )
}



export default Sidebar

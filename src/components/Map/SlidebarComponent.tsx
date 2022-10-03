import { Map } from 'leaflet';
import { Resizable } from 're-resizable';
import React, { useState } from 'react'
import { FiChevronLeft, FiCompass } from "react-icons/fi";
import useWindowDimensions from '../../hooks/useWindowDemension';
import { OrdersTable } from '../OrdersTable/OrdersTable';
import { Sidebar, Tab } from './ReactLeafletSidetabs'

interface ISidebarComponent {
  map: Map;
}
const SidebarComponent = ({ map }: ISidebarComponent) => {

  const [openTab, setOpenTab] = useState<boolean | string>('home')

  const onClose = () => {
    setOpenTab(false)
  }

  const onOpen = (id: string) => {
    setOpenTab(id)
  }
  const { height, width } = useWindowDimensions();
  const [state, setState] = useState({ width: height - 300, height: width / 3 });
  return (

    <section className="Sidebar">
      <Resizable
        size={{ width: state.width, height: state.height, }}
        style={{ zIndex: 500, position: 'absolute' }}
        onResizeStop={(e, direction, ref, d) => {
          setState({
            width: state.width + d.width, height: state.height + d.height,
          });
        }}>
        <Sidebar
          id={'my-sidebar'}
          map={map}
          position="left"
          collapsed={!openTab}
          selected={openTab}
          closeIcon={<FiChevronLeft />}
          onClose={onClose}
          onOpen={onOpen}
          panMapOnChange
          rehomeControls>

          <Tab id="home" icon={<FiCompass />} active>

            <OrdersTable />

          </Tab>


        </Sidebar>
      </Resizable>
    </section>
  )

}

export default SidebarComponent
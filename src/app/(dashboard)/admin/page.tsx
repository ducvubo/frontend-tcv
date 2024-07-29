import React from 'react'
import { cookies } from 'next/headers'
import { SideBar } from './SideBar'

export default function Admin() {
  const layout = cookies().get('react-resizable-panels:layout:mail')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined
  return (
    <section>
      <SideBar defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} navCollapsedSize={4} />
    </section>
  )
}

import React from 'react'
import { Layout } from 'antd'

const { Content } = Layout

export default function LayoutDefault(props: {
	children: React.ReactChildren
}) {
	return (
		<Layout className="layout-default">
			<Content style={{ padding: '0 50px' }}></Content>
		</Layout>
	)
}

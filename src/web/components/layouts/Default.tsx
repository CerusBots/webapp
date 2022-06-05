import React from 'react'
import { Layout } from 'antd'

const { Header, Content, Sider } = Layout

const LayoutDefault: React.FC<{}> = (props) => (
	<Layout hasSider>
		<Sider
			style={{
				overflow: 'auto',
				height: '100vh',
				position: 'fixed',
				left: 0,
				bottom: 0,
				top: 0,
			}}>
			<div className="logo" />
		</Sider>
		<Layout className="layout-default">
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
				<div className="logo" />
			</Header>
			<Content style={{ padding: '0 50px' }}>{props.children}</Content>
		</Layout>
	</Layout>
)

export default LayoutDefault

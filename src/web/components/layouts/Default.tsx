import React, { useState } from 'react'
import { Button, Layout, Input } from 'antd'
import MenuFoldOutline from '@ant-design/icons/MenuFoldOutlined'
import MenuUnfoldOutline from '@ant-design/icons/MenuUnfoldOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'

const { Header, Content, Sider } = Layout

const LayoutDefault: React.FC<{}> = (props) => {
	const [isSideOpen, setSideOpen] = useState(true)
	const [isUserSideOpen, setUserSideOpen] = useState(false)
	return (
		<Layout
			className="layout-default"
			style={{ width: '100vw', height: '100vh' }}>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
					}}>
					<Button
						type="primary"
						icon={isSideOpen ? <MenuFoldOutline /> : <MenuUnfoldOutline />}
						onClick={() => setSideOpen(!isSideOpen)}
					/>
					<Input.Search />
					<Button
						type="primary"
						icon={<UserOutlined />}
						onClick={() => setUserSideOpen(!isUserSideOpen)}
					/>
				</div>
			</Header>
			<Layout style={{ minHeight: '100%' }}>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					collapsed={!isSideOpen}
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
						bottom: 0,
						top: 0,
					}}
					onBreakpoint={(broken) => {
						setSideOpen(!broken)
					}}>
					<div className="logo" />
				</Sider>
				<Content style={{ minHeight: '100%' }}>{props.children}</Content>
				<Sider
					collapsedWidth="0"
					collapsed={!isUserSideOpen}
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						right: 0,
						bottom: 0,
						top: 0,
					}}
					onBreakpoint={(broken) => {
						setSideOpen(!broken)
					}}>
					<div className="logo" />
				</Sider>
			</Layout>
		</Layout>
	)
}

export default LayoutDefault

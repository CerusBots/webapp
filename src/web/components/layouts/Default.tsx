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
			style={{
				position: 'relative',
				display: 'flex',
				height: '100vh',
				width: '100vw',
				flexDirection: 'column',
				overflow: 'hidden',
			}}>
			<Header>
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
			<Layout
				style={{
					display: 'flex',
					flexGrow: '1',
					flexShrink: '1',
					overflow: 'hidden',
				}}>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					collapsed={!isSideOpen}
					onBreakpoint={(broken) => {
						setSideOpen(!broken)
					}}>
					<div className="logo" />
				</Sider>
				<Content style={{ flexGrow: '1', overflow: 'auto' }}>
					{props.children}
				</Content>
				<Sider
					collapsedWidth="0"
					collapsed={!isUserSideOpen}
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

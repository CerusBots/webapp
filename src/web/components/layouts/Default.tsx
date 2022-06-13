import React, { useState } from 'react'
import {
	Avatar,
	Button,
	Layout,
	Input,
	Image,
	Spin,
	Typography,
	Space,
} from 'antd'
import MenuFoldOutline from '@ant-design/icons/MenuFoldOutlined'
import MenuUnfoldOutline from '@ant-design/icons/MenuUnfoldOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { useUser } from '../../contexts'

const { Header, Content, Sider } = Layout
const { Title } = Typography

const LayoutDefault: React.FC<{}> = (props) => {
	const [isSideOpen, setSideOpen] = useState(true)
	const [isUserSideOpen, setUserSideOpen] = useState(false)
	const user = useUser()
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
					style={isUserSideOpen && { paddingLeft: '2vw', paddingRight: '2vw' }}
					onBreakpoint={(broken) => {
						setSideOpen(!broken)
					}}>
					{user && (
						<Title level={5} style={{ color: 'white' }}>
							<Space>
								<Avatar
									draggable={false}
									src={
										<Image
											src={
												typeof user.avatarHash === 'string'
													? `https://cdn.discordapp.com/avatars/${user.discordID}/${user.avatarHash}.png`
													: `https://cdn.discordapp.com/embed/avatars/${user.discriminator.charAt(
															user.discriminator.length - 1
													  )}.png`
											}
										/>
									}
								/>
								<span>
									{user.username}#{user.discriminator}
								</span>
							</Space>
						</Title>
					)}
					{!user && <Spin spinning />}
				</Sider>
			</Layout>
		</Layout>
	)
}

export default LayoutDefault

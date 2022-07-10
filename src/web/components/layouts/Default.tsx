import React, { useState } from 'react'
import {
	Avatar,
	Button,
	Dropdown,
	Layout,
	Input,
	Image,
	Spin,
	Typography,
	Space,
	Select,
	Menu,
	Tooltip,
} from 'antd'
import MenuFoldOutline from '@ant-design/icons/MenuFoldOutlined'
import MenuUnfoldOutline from '@ant-design/icons/MenuUnfoldOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import BellOutlined from '@ant-design/icons/BellFilled'
import { useUser } from '../../contexts'
import './Default.scss'

const { Header, Content, Sider } = Layout
const { Title } = Typography
// const { Option } = Select

const LayoutDefault: React.FC<{}> = (props) => {
	const [isSideOpen, setSideOpen] = useState(true)
	const [isUserSideOpen, setUserSideOpen] = useState(false)
	const [isSearchOpen, setSearchOpen] = useState(true)
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
				<div className="center" style={{ width: '100%' }}>
					<Button
						type="link"
						icon={
							isSideOpen ? (
								<MenuFoldOutline style={{ color: '#ffffff' }} />
							) : (
								<MenuUnfoldOutline style={{ color: '#ffffff' }} />
							)
						}
						onClick={() => setSideOpen(!isSideOpen)}
					/>
					<Button
						type="link"
						className="header-search"
						icon={<SearchOutlined style={{ color: '#ffffff' }} />}
						onClick={() => setSearchOpen(!isSearchOpen)}
					/>
					{isSearchOpen && <Input.Search />}
					{!isSearchOpen && (
						<div className="center">
							<Select placeholder="Select bot..."></Select>
							<Button
								type="link"
								icon={<PlusOutlined style={{ color: '#ffffff' }} />}
							/>
						</div>
					)}
					<div className="header-bot center">
						<Select placeholder="Select bot..."></Select>
						<Button
							type="link"
							icon={<PlusOutlined style={{ color: '#ffffff' }} />}
						/>
					</div>
					<Dropdown overlay={<Menu />} trigger={['click']}>
						<Button type="link" onClick={(e) => e.preventDefault()}>
							<Space>
								<Tooltip placement="bottom" title={<span>0 Alerts</span>}>
									<BellOutlined style={{ color: '#ffffff' }} />
								</Tooltip>
							</Space>
						</Button>
					</Dropdown>
					<Button
						type="link"
						icon={<UserOutlined style={{ color: '#ffffff' }} />}
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
					className="sider-main"
					breakpoint="lg"
					zeroWidthTriggerStyle={{ display: 'none' }}
					collapsedWidth="0"
					collapsed={!isSideOpen}
					style={
						isSideOpen && {
							paddingLeft: '2vw',
							paddingRight: '2vw',
							paddingTop: '2vh',
							paddingBottom: '2vh',
						}
					}
					onBreakpoint={(broken) => setSideOpen(!broken)}>
					<Title className="sider-bot-select">
						<div className="center">
							<Select placeholder="Select bot..."></Select>
							<Button
								type="link"
								icon={<PlusOutlined style={{ color: '#ffffff' }} />}
							/>
						</div>
					</Title>
				</Sider>
				<Content style={{ flexGrow: '1', overflow: 'auto' }}>
					{props.children}
				</Content>
				<Sider
					className="sider-user"
					zeroWidthTriggerStyle={{ display: 'none' }}
					collapsedWidth="0"
					collapsed={!isUserSideOpen}
					style={
						isUserSideOpen && {
							paddingLeft: '2vw',
							paddingRight: '2vw',
							paddingTop: '2vh',
							paddingBottom: '2vh',
						}
					}
					onBreakpoint={(broken) => setSideOpen(!broken)}>
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
													: typeof user.discriminator === 'string'
													? `https://cdn.discordapp.com/embed/avatars/${user.discriminator.charAt(
															user.discriminator.length - 1
													  )}.png`
													: undefined
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

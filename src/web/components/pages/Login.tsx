import { useAuth0 } from '@auth0/auth0-react'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { Alert, Layout, Card, Spin, Button } from 'antd'
import { useError, useURL } from '../../contexts'

const { Content } = Layout

const PageLogin: React.FC<{}> = (props) => {
	const url = useURL()
	const [error, setError] = useState<Error | AxiosError | null>(useError())
	const { loginWithRedirect } = useAuth0()

	return (
		<Layout
			style={{
				position: 'relative',
				display: 'flex',
				height: '100vh',
				width: '100vw',
				flexDirection: 'column',
				overflow: 'hidden',
			}}>
			<Content
				style={{
					display: 'flex',
					flexGrow: '1',
					flexShrink: '1',
					overflow: 'hidden',
					alignItems: 'center',
					alignContent: 'center',
					alignSelf: 'center',
				}}>
				<Card title="Login" bordered={true}>
					<div>
						{error && (
							<Alert
								type="error"
								message={
									'response' in error
										? error.response.statusText || error.message
										: error.message
								}
								showIcon
							/>
						)}
						<Button onClick={() => loginWithRedirect()} type="primary">
							Log in
						</Button>
					</div>
				</Card>
			</Content>
		</Layout>
	)
}
export default PageLogin

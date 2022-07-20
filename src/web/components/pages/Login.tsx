import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { parse } from 'querystring'
import React, { useEffect, useState } from 'react'
import { Alert, Layout, Card, Button } from 'antd'
import { useError, useURL } from '../../contexts'

const { Content } = Layout

const PageLogin: React.FC<{}> = (props) => {
	const url = useURL()
	const query = parse(url.search.substring(1))
	const nav = useNavigate()
	const [error, setError] = useState<Error | AxiosError | null>(useError())
	const { loginWithRedirect, handleRedirectCallback } = useAuth0()

	useEffect(() => {
		if (typeof query.code === 'string' && typeof query.state === 'string')
			handleRedirectCallback()
				.then(({ appState }) => {
					const returnTo =
						typeof appState === 'object' && typeof appState.returnTo === 'string'
							? appState.returnTo
							: '/'
					nav(returnTo, { replace: true })
				})
				.catch((e) => setError(e))
		else if (typeof query.error !== 'string') loginWithRedirect()
		else if (
			typeof query.error === 'string' &&
			typeof query.error_description === 'string'
		)
			setError(new Error(query.error_description))
	}, [])

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
						<Button
							onClick={() =>
								loginWithRedirect({ appState: { returnTo: query.returnTo } })
							}
							type="primary">
							Log in
						</Button>
					</div>
				</Card>
			</Content>
		</Layout>
	)
}
export default PageLogin

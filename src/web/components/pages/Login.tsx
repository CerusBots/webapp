import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { Alert, Layout, Card, Spin, Button } from 'antd'
import { parse, stringify } from 'querystring'
import { useError, useURL } from '../../contexts'

const { Content } = Layout

const noQuery = (url: string) => url.substring(0, url.indexOf('?'))

const PageLogin: React.FC<{}> = (props) => {
	const url = useURL()
	const query = parse(url.search.substring(1))
	const [error, setError] = useState<Error | AxiosError | null>(useError())
	const [isLoaded, setLoaded] = useState<boolean>(false)

	useEffect(() => {
		if (error === null) {
			if (typeof query.code === 'undefined') {
				window.location.assign(
					`https://discord.com/api/oauth2/authorize?client_id=${
						process.env.CLIENT_ID
					}&permissions=0&redirect_uri=${encodeURIComponent(
						noQuery(url.toString())
					)}&response_type=code&scope=identify%20email%20connections`
				)
			} else {
				axios
					.post(
						'https://discord.com/api/v10/oauth2/token',
						stringify({
							client_id: process.env.CLIENT_ID,
							client_secret: process.env.CLIENT_SECRET,
							grant_type: 'authorization_code',
							code: query.code,
							redirect_uri: url
								.toString()
								.substring(0, url.toString().indexOf(url.pathname)),
						})
					)
					.then((resp) => {
						Cookie.set(
							'auth.token',
							`${resp.data.token_type} ${resp.data.access_token}`,
							{
								expires: resp.data.expires_in,
								domain: process.env.DOMAIN,
							}
						)

						Cookie.set('auth.refresh-token', resp.data.refresh_token, {
							domain: process.env.DOMAIN,
						})

						setLoaded(true)
						window.location.assign('/')
					})
					.catch((error) => {
						if (
							typeof error.response === 'object' &&
							typeof error.response.data === 'object'
						)
							setError(
								new Error(
									`${error.response.data.error}: ${error.response.data.error_description}`
								)
							)
						else setError(error)
						setLoaded(true)
					})
			}
		}
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
					<Spin spinning={!isLoaded} />
					{error && (
						<div>
							<Alert
								type="error"
								message={
									'response' in error
										? error.response.statusText || error.message
										: error.message
								}
								showIcon
							/>
							<Button href="/login" type="primary">
								Try Again
							</Button>
						</div>
					)}
				</Card>
			</Content>
		</Layout>
	)
}
export default PageLogin

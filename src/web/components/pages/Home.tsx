import { useAuth0 } from '@auth0/auth0-react'
import React, { useState } from 'react'
import { Alert, Spin } from 'antd'
import LayoutDefault from '../layouts/Default'

const PageHome: React.FC<{}> = () => {
	const { isAuthenticated, user } = useAuth0()
	const [isLoaded] = useState<boolean>(
		typeof user === 'object' && isAuthenticated
	)
	const [error] = useState<Error | null>(
		typeof user !== 'object' && !isAuthenticated
			? new Error('User is not logged in')
			: null
	)

	return (
		<LayoutDefault>
			{error && <Alert type="error" message={error.message} showIcon />}
			<Spin spinning={!isLoaded} />
		</LayoutDefault>
	)
}

export default PageHome

import React, { useState } from 'react'
import { Alert, Spin } from 'antd'
import LayoutDefault from '../layouts/Default'
import { useUser } from '../../contexts'
import { Navigate } from 'react-router-dom'

const PageHome: React.FC<{}> = () => {
	const user = useUser()
	const [isLoaded] = useState<boolean>(typeof user === 'object')
	const [error] = useState<Error | null>(
		typeof user !== 'object' ? new Error('User is not logged in') : null
	)

	return (
		<LayoutDefault>
			<Spin spinning={!isLoaded} />
			{error && <Alert type="error" message={error.message} showIcon />}
			{!user && <Navigate to="/login" replace={true} />}
		</LayoutDefault>
	)
}

export default PageHome

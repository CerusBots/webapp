import { BaseContext, transformMethods } from '../context'
import { BaseMessageInterface } from '@cerusbots/common/dist/http/message'
import { APIUser } from '@cerusbots/common/dist/http/types'

export default transformMethods(
	{
		get: async function getUser(this: BaseContext) {
			const resp = await this.axios.get<BaseMessageInterface<APIUser>>('/user/')
			if (resp.data.type !== 'user:get')
				throw new Error(
					`Invalid message type "${resp.data.type}", expected "user.get"`
				)
			return resp.data.data
		},
	},
	['get']
)

'use strict'

const User = use("App/Models/User")

class DepositController {
	async deposit({request, response, auth}) {
		let id = auth.user.id//.toJSON
		//user.balance = auth.balance
		//console.log(auth)
		let am = {}
		if(request.input('a2000'))
			am.a2000 = request.input('a2000')
		else
			am.a2000 = 0

		if(request.input('a500'))
			am.a500 = request.input('a500')
		else
			am.a500 = 0

		if(request.input('a200'))
			am.a200 = request.input('a200')
		else
			am.a200 = 0

	    if(request.input('a100'))
			am.a100 = request.input('a100')
		else
			am.a100 = 0

		if(request.input('a50'))
			am.a50 = request.input('a50')
		else
			am.a50 = 0

		if(request.input('a20'))
			am.a20 = request.input('a20')
		else
			am.a20 = 0

		if(request.input('a10'))
			am.a10 = request.input('a10')
		else
			am.a10 = 0

		if(request.input('a5'))
			am.a5 = request.input('a5')
		else
			am.a5 = 0

		if(request.input('a2'))
			am.a2 = request.input('a2')
		else
			am.a2 = 0

		if(request.input('a1'))
			am.a1 = request.input('a1')
		else
			am.a1 = 0

		var amount = am.a2000 * 2000 + am.a500 * 500 + am.a200 * 200 + am.a100 * 100
						am.a50 * 50 + am.a20 * 20 + am.a10 * 10 + am.a5 * 5 + am.a2 * 2 + am.a1

		var user = await User.find(id)
		user.balance = parseInt(user.balance) + parseInt(amount)

		try {
			await user.save()	
			return response.ok({ user, successMsg: 'Amount Deposited' });
		}
		catch(error) {
			return response.internalServerError({ errorMsg: error.message })
		}
	}
}

module.exports = DepositController

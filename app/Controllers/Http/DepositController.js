'use strict'

const User = use("App/Models/User")
const ATM = use("App/Models/AtmCashes")

class DepositController {
	async deposit({request, response, auth}) {
		let id = auth.user.id//.toJSON
		//user.balance = auth.balance
		//console.log(auth)
		var atm = await ATM.find(1)
		let am = {}
		if(request.input('a2000')) {
			am.a2000 = request.input('a2000')
			atm.a2000 = parseInt(atm.a2000) + parseInt(am.a2000)
		}
		else
			am.a2000 = 0

		if(request.input('a500')) {
			am.a500 = request.input('a500')
			atm.a500 = parseInt(atm.a500) + parseInt(am.a500)
		}
		else
			am.a500 = 0

		if(request.input('a200')) {
			am.a200 = request.input('a200')
			atm.a200 = parseInt(atm.a200) + parseInt(am.a200)
		}
		else
			am.a200 = 0

	    if(request.input('a100')) {
			am.a100 = request.input('a100')
			atm.a100 = parseInt(atm.a100) + parseInt(am.a100)
	    }
		else
			am.a100 = 0

		if(request.input('a50')) {
			am.a50 = request.input('a50')
			atm.a50 = parseInt(atm.a50) + parseInt(am.a50)
		}
		else
			am.a50 = 0

		if(request.input('a20')) {
			am.a20 = request.input('a20')
			atm.a20 = parseInt(atm.a20) + parseInt(am.a20)
		}
		else
			am.a20 = 0

		if(request.input('a10')) {
			am.a10 = request.input('a10')
			atm.a10 = parseInt(atm.a10) + parseInt(am.a10)
		}
		else
			am.a10 = 0

		if(request.input('a5')) {
			am.a5 = request.input('a5')
			atm.a5 = parseInt(atm.a5) + parseInt(am.a5)
		}
		else
			am.a5 = 0

		if(request.input('a2')) {
			am.a2 = request.input('a2')
			atm.a2 = parseInt(atm.a2) + parseInt(am.a2)
		}
		else
			am.a2 = 0

		if(request.input('a1')) {
			am.a1 = request.input('a1')
			atm.a1 = parseInt(atm.a1) + parseInt(am.a1)
		}
		else
			am.a1 = 0

		var amount = am.a2000 * 2000 + am.a500 * 500 + am.a200 * 200 + am.a100 * 100
						am.a50 * 50 + am.a20 * 20 + am.a10 * 10 + am.a5 * 5 + am.a2 * 2 + am.a1

		var user = await User.find(id)
		user.balance = parseInt(user.balance) + parseInt(amount)

		try {
			await user.save()	
			return response.ok({ user, atm, successMsg: 'Amount Deposited' });
		}
		catch(error) {
			return response.internalServerError({ errorMsg: error.message })
		}
	}
}

module.exports = DepositController

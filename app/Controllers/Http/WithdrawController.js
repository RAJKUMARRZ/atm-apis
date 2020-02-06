'use strict'

const User = use("App/Models/User")
const ATM = use("App/Models/AtmCashes")

class WithdrawController {
	async withdraw({request, response, auth}) {
		var atm = await ATM.find(1)

		let id = auth.user.id
		let amount = request.input('amount')
		if(parseInt(amount) > parseInt(auth.user.balance)) {
			return response.badRequest({ errorMsg: 'Insufficient Balance' })
		}

		else if(parseInt(amount) > 20000) {
			return response.badRequest({ errorMsg: 'Maximum limit is 20000 per Transaction' })
		}

		else {
			let am = parseInt(amount)
			var den = {}

			den.a2000 = Math.floor(am/2000)
			atm.a2000 = parseInt(atm.a2000) - parseInt(am.a2000) 
			am = am%2000
			
			den.a500 = Math.floor(am/500)
			atm.a500 = parseInt(atm.a500) - parseInt(am.a500)
			am = am%500

			den.a200 = Math.floor(am/200)
			atm.a200 = parseInt(atm.a200) - parseInt(am.a200)
			am = am%200

			den.a100 = Math.floor(am/100)
			atm.a100 = parseInt(atm.a100) - parseInt(am.a100)
			am = am%100

			den.a50 = Math.floor(am/50)
			atm.a50 = parseInt(atm.a50) - parseInt(am.a50)
			am = am%50

			den.a20 = Math.floor(am/20)
			atm.a20 = parseInt(atm.a20) - parseInt(am.a20)
			am = am%20

			den.a10 = Math.floor(am/10)
			atm.a10 = parseInt(atm.a10) - parseInt(am.a10)
			am = am%10

			den.a5 = Math.floor(am/5)
			atm.a5 = parseInt(atm.a5) - parseInt(am.a5)
			am = am%5

			den.a2 = Math.floor(am/2)
			atm.a2 = parseInt(atm.a2) - parseInt(am.a2)
			am = am%2

			den.a1 = am
			atm.a1 = parseInt(atm.a1) - parseInt(am.a1)

			let user = await User.find(id)
			user.balance = parseInt(user.balance) - parseInt(amount)
			try {
				user.save()
				return response.ok({ user, den, atm })
			} catch(error) {
				response.internalServerError({ errorMsg: error.message, message:'Some Error Occurred' })
			}
		}
	}
}

module.exports = WithdrawController

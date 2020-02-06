'use strict'

const User = use("App/Models/User")

class WithdrawController {
	async withdraw({request, response, auth}) {

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
			am = am%2000
			
			den.a500 = Math.floor(am/500)
			am = am%500

			den.a200 = Math.floor(am/200)
			am = am%200

			den.a100 = Math.floor(am/100)
			am = am%100

			den.a50 = Math.floor(am/50)
			am = am%50

			den.a20 = Math.floor(am/20)
			am = am%20

			den.a10 = Math.floor(am/10)
			am = am%10

			den.a5 = Math.floor(am/5)
			am = am%5

			den.a2 = Math.floor(am/2)
			am = am%2

			den.a1 = am

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

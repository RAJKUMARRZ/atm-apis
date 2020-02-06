'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class RegisterController {

	async register({request, auth, response}) {
		const card = request.input('card')
		const pin = request.input('pin')

		const rules = { 
    	    card: 'required|unique:users,card|min:8|max:8',    
        	pin: 'required|min:4|max:4',
    	}

    	const messages = {
        	'card:required' : 'Please enter card field',
        	'card:min' : 'Card Number should be 8 characteres long',
        	'card:max' : 'Card Number should be 8 characteres long',
        	'pin:required' : 'Please enter pin field',
        	'pin:min' : 'PIN should be 4 characteres long',
        	'pin:max' : 'PIN should be 4 characteres long',
    	}

    	const validation = await validate(request.all(), rules, messages)
    	if(validation.fails()) {
        	return response.badRequest({ errorMsg: validation.messages() })
    	}

        let user = new User
        user.card = card
        user.pin = pin
        user.balance = 0

        let message = 'User Registered Successfully!'

        try {
            await user.save()
            let accessToken = await auth.generate(user) 
            if(accessToken) {
                user.save()
            } 
            else 
            	return response.badRequest({ errorMsg: 'Some Error Occurred' })
            
            return response.ok({ "user": user, "access_token": accessToken })
        } catch (error) {
           return response.internalServerError({ errorMsg: error.message, message: 'This is Catch' }) 
        }
    }
}

module.exports = RegisterController

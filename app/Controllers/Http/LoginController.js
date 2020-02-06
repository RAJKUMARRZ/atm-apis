"use strict";

const User = use("App/Models/User");
const Hash = use("Hash");
const { validate } = use('Validator')

class LoginController {
  	async login({ request, response, auth }) {
		const card = request.input('card')
    	const pin = request.input('pin')

	    const rules = { 
    	    card: 'required|min:8|max:8',    
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

    	let credition = {};
      	credition.card = card

      	credition["pin"] = pin
        console.log(credition);
        const user = await User.query()
          	.where("card", credition.card)
          	.first(); 

        if (user) {
        	if (user.pin === pin) {
         		user.token = await auth.generate(user);
          		return response.ok({ Details: user })
        	} else {
            	return response.badRequest({ errorMsg: "Invalid Pin or Card Number" })
        	}
        }
    }
}

module.exports = LoginController;

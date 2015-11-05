export default {
	label: {
		button: {
			save: 'Send'
		},
		home: {
			title: 'Home',
			sent: 'Sent',
			text: {
				title: 'Text field',
				textNotValidated: {
					label: 'Text not validated',
					help: 'This field has no validation defined.'
				},
				textFree: 'Text free',
				textRequired: 'Text required',
				textMinMax: {
					label: 'Text min max',
					placeholder: 'Text with min and max'
				},
				textMinMaxReq: {
					label: 'Text min max req',
					placeholder: 'Text with min and max required',
					help: 'Must have 4 to 10 characters.'
				},
				textNumbers: 'Text numbers only',
				textBackend: {
					label: 'Text backend',
					placeholder: 'Text validated on backend',
					help: 'A field further validated on submit on backend does not provide success feedback, only error feedback.'
				}
			},
			password: {
				title: 'Password field',
				passwordFree: 'Password free',
				passwordRequired: 'Password required'
			},
			select: {
				title: 'Select field',
				selectFree: 'Select free',
				selectRequired: 'Select required'
			},
			date: {
				title: 'Date field',
				dateFree: 'Date free',
				dateRequired: 'Date required'
			}
		}
	}
}

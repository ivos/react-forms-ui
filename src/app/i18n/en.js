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
				},
				textValue: 'Text w/ value',
				textValueRequired: 'Required w/ value',
				textReadonly: 'Readonly text',
				textReadonlyEmpty: 'Readonly text empty'
			},
			password: {
				title: 'Password field',
				passwordFree: 'Password free',
				passwordRequired: 'Password required',
				passwordValue: 'Password w/ value',
				passwordValueRequired: 'Password req w/ value',
				passwordReadonly: 'Password readonly',
				passwordReadonlyEmpty: 'Password readonly empty'
			},
			select: {
				title: 'Select field',
				selectFree: 'Select free',
				selectRequired: 'Select required',
				selectValue: 'Select w/ value',
				selectValueRequired: 'Select req w/ value',
				selectReadonly: 'Select readonly',
				selectReadonlyEmpty: 'Select readonly empty',
				selectValPreloaded: 'Select val preloaded',
				selectGroup: 'Group',
				selectProduct: 'Product'
			},
			date: {
				title: 'Date field',
				dateFree: 'Date free',
				dateRequired: 'Date required',
				dateValue: 'Date w/ value',
				dateValueRequired: 'Date req w/ value',
				dateReadonly: 'Date readonly',
				dateReadonlyEmpty: 'Date readonly empty'
			}
		}
	}
}

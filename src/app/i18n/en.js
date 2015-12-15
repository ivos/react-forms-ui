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
				passwordValueRequired: {
					label: 'Password req w/ value',
					help: 'Password required with value.'
				},
				passwordReadonly: 'Password readonly',
				passwordReadonlyEmpty: 'Password readonly empty'
			},
			number: {
				title: 'Number field',
				numberFree: 'Number free',
				numberRequired: 'Number required',
				numberValue: {
					label: 'Number w/ value',
					help: 'Default format is 0,0.[00] which means round to max 2 decimal places and show thousands separator.'
				},
				numberValueRequired: {
					label: 'Number req w/ value',
					help: 'Number required with value.'
				},
				numberReadonly: 'Number readonly',
				numberReadonlyEmpty: 'Number readonly empty',
				numberCustomFormat: {
					label: 'Number w/ fmt',
					help: 'Number with custom format with fixed 3 decimal places and no thousands separator: 0.000. Minimum value is 0.'
				},
				numberMinMax: {
					label: 'Number min max',
					help: 'Number with minimum 3 and maximum 30.'
				}
			},
			select: {
				title: 'Select field',
				selectFree: 'Select free',
				selectRequired: 'Select required',
				selectValue: 'Select w/ value',
				selectValueRequired: 'Select req w/ value',
				selectReadonly: 'Select readonly',
				selectReadonlyEmpty: 'Select readonly empty',
				selectGroup: 'Group',
				selectProduct: 'Product'
			},
			date: {
				title: 'Date field',
				dateFree: 'Date free',
				dateRequired: 'Date required',
				dateValue: 'Date w/ value',
				dateValueRequired: {
					label: 'Date req w/ value',
					help: 'Date required with a value predefined.'
				},
				dateMinMax: {
					label: 'Date min max',
					help: 'Date required with a minimum and maximum value defined. The allowed interval is +- 7 days.'
				},
				dateReadonly: 'Date readonly',
				dateReadonlyEmpty: 'Date readonly empty'
			},
			daterange: {
				title: 'Date range field',
				drFree: 'Date range free',
				drReq: {
					label: 'Date range req',
					placeholderFrom: 'Date range required from',
					placeholderTo: 'Date range required to'
				},
				drValue: 'Date range value',
				drFromReq: 'Dt.rg from req',
				drToReq: 'Dt.rg to req',
				drRO: 'Dt.rg readonly',
				drROEmpty: 'Dt.rg readonly empty',
				drROFromEmpty: 'Dt.rg RO empty from',
				drROToEmpty: 'Dt.rg RO empty to'
			},
			table: {
				title: 'Table form',
				text: 'Text (uppercase)',
				password: 'Password',
				number: 'Number',
				date: 'Date',
				dr: 'Date range',
				select: 'Select',
				boolean: 'Boolean'
			},
			boolean: {
				title: 'Boolean field',
				bool: 'Checkbox',
				boolChecked: 'Checkbox checked',
				boolRO: 'Checkbox read-only'
			}
		}
	}
}

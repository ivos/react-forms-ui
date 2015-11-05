export default {
	label: {
		button: {
			save: 'Odeslat'
		},
		home: {
			title: 'Úvod',
			sent: 'Odesláno',
			text: {
				title: 'Textové pole',
				textNotValidated: {
					label: 'Text bez validace',
					help: 'Toto pole nemá definovánu žádnou validaci.'
				},
				textFree: 'Text volný',
				textRequired: 'Text povinný',
				textMinMax: {
					label: 'Text min max',
					placeholder: 'Text s minimem a maximem'
				},
				textMinMaxReq: {
					label: 'Text min max req',
					placeholder: 'Text s minimem a maximem povinný',
					help: 'Musí mít 4 až 10 znaků.'
				},
				textNumbers: 'Text pouze čísla',
				textBackend: {
					label: 'Text backend',
					placeholder: 'Text validovaný na backendu',
					help: 'Pole validované při odeslání na backendu neposkytuje zpětnou vazbu pro platné hodnoty, pouze pro chyby.'
				}
			},
			password: {
				title: 'Heslo',
				passwordFree: 'Heslo volné',
				passwordRequired: 'Heslo povinné'
			},
			select: {
				title: 'Výběr',
				selectFree: 'Výběr volný',
				selectRequired: 'Výběr povinný'
			},
			date: {
				title: 'Datum',
				dateFree: 'Datum volný',
				dateRequired: 'Datum povinný'
			}
		}
	}
}

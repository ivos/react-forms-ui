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
				},
				textValue: 'Text s hodnotou',
				textValueRequired: 'Povinný text s hodnotou',
				textReadonly: 'Needitovatelný text',
				textReadonlyEmpty: 'Needitovatelný text prázdný'
			},
			password: {
				title: 'Heslo',
				passwordFree: 'Heslo volné',
				passwordRequired: 'Heslo povinné',
				passwordValue: 'Heslo s hodnotou',
				passwordValueRequired: 'Heslo povinné s hodnotou',
				passwordReadonly: 'Needitovatelné heslo',
				passwordReadonlyEmpty: 'Needitovatelné heslo prázdné'
			},
			select: {
				title: 'Výběr',
				selectFree: 'Výběr volný',
				selectRequired: 'Výběr povinný',
				selectValue: 'Výběr s hodnotou',
				selectValueRequired: 'Výběr pov s hodnotou',
				selectReadonly: 'Výběr needitovatelný',
				selectReadonlyEmpty: 'Výběr needit prázdný',
				selectValPreloaded: 'Výběr preloaded',
				selectGroup: 'Skupina',
				selectProduct: 'Produkt'
			},
			date: {
				title: 'Datum',
				dateFree: 'Datum volný',
				dateRequired: 'Datum povinný',
				dateValue: 'Datum s hodnotou',
				dateValueRequired: 'Datum pov s hodnotou',
				dateReadonly: 'Needit datum',
				dateReadonlyEmpty: 'Needit datum prázdný'
			}
		}
	}
}

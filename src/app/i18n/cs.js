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
				passwordValueRequired: {
					label: 'Heslo povinné s hodnotou',
					help: 'Heslo povinné s hodnotou.'
				},
				passwordReadonly: 'Needitovatelné heslo',
				passwordReadonlyEmpty: 'Needitovatelné heslo prázdné'
			},
			number: {
				title: 'Číselné pole',
				numberFree: 'Číslo volné',
				numberRequired: 'Číslo povinné',
				numberValue: {
					label: 'Číslo s hodnotou',
					help: 'Standardní formát je 0,0.[00], což znamená zaokrouhlit na maximálně 2 desetinná místa a zobrazit oddělovač tisíců.'
				},
				numberValueRequired: {
					label: 'Číslo pov.s hod.',
					help: 'Číslo povinné s hodnotou.'
				},
				numberReadonly: 'Needit. číslo',
				numberReadonlyEmpty: 'Needit. číslo prázdné',
				numberCustomFormat: {
					label: 'Číslo s fmt.',
					help: 'Číslo s nastaveným formátem pevná 3 desetinná místa a nezobrazovat oddělovač: 0.000. Minimální hodnota je 0.'
				},
				numberMinMax: {
					label: 'Číslo min max',
					help: 'Číslo s minimem 3 a maximem 30.'
				}
			},
			select: {
				title: 'Výběr',
				selectFree: 'Výběr volný',
				selectRequired: 'Výběr povinný',
				selectValue: 'Výběr s hodnotou',
				selectValueRequired: 'Výběr pov s hodnotou',
				selectReadonly: 'Výběr needitovatelný',
				selectReadonlyEmpty: 'Výběr needit prázdný',
				selectGroup: 'Skupina',
				selectProduct: 'Produkt'
			},
			date: {
				title: 'Datum',
				dateFree: 'Datum volný',
				dateRequired: 'Datum povinný',
				dateValue: 'Datum s hodnotou',
				dateValueRequired: {
					label: 'Datum pov s hodnotou',
					help: 'Datum povinný s předdefinovanou hodnotou'
				},
				dateMinMax: {
					label: 'Datum min max',
					help: 'Datum povinný s minimem a maximem. Povolený interval je +- 7 dní.'
				},
				dateReadonly: 'Needit datum',
				dateReadonlyEmpty: 'Needit datum prázdný'
			},
			daterange: {
				title: 'Interval dat',
				drFree: 'Int.dat volný',
				drReq: {
					label: 'Int.dat pov.',
					placeholderFrom: 'Interval dat povinný, od',
					placeholderTo: 'Interval dat povinný, do'
				},
				drValue: 'Int.dat s hodnotou',
				drFromReq: 'Int.dat od pov.',
				drToReq: 'Int.dat do pov.',
				drRO: 'Needit. int.dat',
				drROEmpty: 'Needit. int.dat prázdný',
				drROFromEmpty: 'Needit. int.dat prázdné od',
				drROToEmpty: 'Needit. int.dat prázdné do'
			},
			table: {
				title: 'Formulář v tabulce',
				text: 'Text (velká písmena)',
				password: 'Heslo',
				number: 'Číslo',
				date: 'Datum',
				dr: 'Interval dat',
				select: 'Výběr',
				boolean: 'Boolean'
			},
			boolean: {
				title: 'Boolean',
				bool: 'Checkbox',
				boolChecked: 'Checkbox zaškrtnutý',
				boolRO: 'Checkbox needitovatelný'
			}
		}
	}
}

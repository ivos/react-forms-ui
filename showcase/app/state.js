export default {
	companies: [
		{
			id: 0,
			name: 'First business',
			taxId: 'US100001',
			companyId: '10000001',
			invoicingContact: {
				name: 'John Doe',
				phone: '+1 134-555-666',
				email: 'john.doe@first.com',
				country: 'USA',
				city: 'Phoenix',
				street: '1200 Main street',
				zip: '12300'
			}
		},
		{
			id: 1,
			name: 'Acme',
			taxId: 'US5453656',
			companyId: '54536563',
			invoicingContact: {
				name: 'Jane Smith',
				phone: '+1 134-555-777',
				email: 'jane.smith@acme.com',
				country: 'USA',
				city: 'Tucson',
				street: '1200 Railway street',
				zip: '32100'
			}
		},
		{
			id: 2,
			name: 'First sales',
			taxId: 'US100321',
			companyId: '10000321',
			invoicingContact: {
				name: 'Pete Hunt',
				phone: '+1 134-555-777',
				email: 'peteh@sales.com',
				country: 'USA',
				city: 'Florida',
				street: '321 Canal st.',
				zip: '54300'
			}
		},
		{
			id: 3,
			name: 'Big wig',
			taxId: 'US100643',
			companyId: '100002342',
			invoicingContact: {
				name: 'Paul Stunt',
				phone: '+1 134-555-356',
				email: 'stunt@wig.com',
				country: 'USA',
				city: 'Little Rock',
				street: '321 Black st.',
				zip: '63200'
			}
		}
	],
	groups: [
		{
			id: 0,
			name: 'Tea'
		},
		{
			id: 1,
			name: 'Water'
		},
		{
			id: 2,
			name: 'Alcoholic beverage'
		},
		{
			id: 3,
			name: 'Energy drink'
		}
	],
	products: [
		{
			id: 0,
			group: 0,
			name: 'Earl grey tea'
		},
		{
			id: 1,
			group: 0,
			name: 'English breakfast tea'
		},
		{
			id: 2,
			group: 0,
			name: 'Lemon tea'
		},
		{
			id: 3,
			group: 2,
			name: 'Red wine'
		},
		{
			id: 4,
			group: 2,
			name: 'White wine'
		},
		{
			id: 5,
			group: 2,
			name: 'Beer'
		},
		{
			id: 6,
			group: 2,
			name: 'Whisky'
		},
		{
			id: 7,
			group: 3,
			name: 'Red Bull'
		},
		{
			id: 8,
			group: 3,
			name: 'Monster'
		}
	]
};

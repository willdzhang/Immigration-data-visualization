
var chart = c3.generate({
	title: {
        show: false,
        text: "Top 5 countries' inflow migration",
        position: 'top-center',   // top-left, top-center and top-right
        padding: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 50
		}
	},
	data: {
        x: 'year',
        columns: [
            ['year', 1990, 1995, 2000, 2005, 2010, 2015,2017],
            ['The United States',20134790,26593925,33157941,36996835,42071829,45890296,47412413],
			["German",5601544,7130259,8658910,9249168,9711410,10118844,12044115],
			["Saudi Arabia",4830679,4950773,5086745,6283624,8147064,10408329,11774584],
			["France",5897267,6087993,6278718,6737600,7196481,7918382,7902783],
			["United Kingdom",3641645,4132002,4692050,5886598,7560559,8370798,8799334]
		]
		
	},
	axis: {
		x: {
			label: 'Year'
		},
		y: {
			label: 'Population'
		}
	}

});
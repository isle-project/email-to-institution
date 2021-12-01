/**
* Copyright (C) 2016-present The ISLE Authors
*
* The isle-server program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';

// MODULES //

const tape = require( 'tape' );
const emailToInstitution = require( './../lib/index.js' );


// TESTS //

tape( 'main export is a function', t => {
	t.equal( typeof emailToInstitution, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided an email address', t => {
	const values = [
		'beep',
		5,
		null,
		void 0,
		NaN,
		true,
		[],
		{},
		function noop() {}
	];

	for ( let i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return () => emailToInstitution( value );
	}
});

tape( 'the function throws an error if provided a second argument which is not a plain object', t => {
	const values = [
		'beep',
		5,
		null,
		void 0,
		NaN,
		true,
		[],
		function noop() {}
	];

	for ( let i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return () => emailToInstitution( value );
	}
});

tape( 'the function returns a company name when provided a known company email address', t => {
	const values = [
		'jane.doe@gs.com',
		'john.doe@abercrombie.com',
		'ceo@aetna.com',
		'support@ups.com'
	];
	const expected = [
		'Goldman Sachs Group',
		'Abercrombie & Fitch',
		'Aetna',
		'UPS'
	];

	for ( let i = 0; i < values.length; i++ ) {
		t.equal( emailToInstitution( values[i] ), expected[i], 'returns '+expected[i]+' when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an institution name for email addresses of institutions of higher education', t => {
	const values = [
		'jane.doe@emory.edu',
		'myself@stanford.edu',
		'john.doe@evergreen.edu'
	];
	const expected = [
		'Emory University',
		'Stanford University',
		'Evergreen State College'
	];

	for ( let i = 0; i < values.length; i++ ) {
		t.equal( emailToInstitution( values[i] ), expected[i], 'returns '+expected[i]+' for '+values[i] );
	}
	t.end();
});

tape( 'the function returns "Personal" if the email address is a personal email address', t => {
	const values = [
		'myself@gmail.com',
		'jane.doe@hotmail.com',
		'john.doe@aol.com'
	];
	for ( let i = 0; i < values.length; i++ ) {
		t.equal( emailToInstitution( values[i] ), 'Personal', 'returns expected value when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns the capitalized domain name provided an email address that does not match any institution', t => {
	const values = [
		'isle@kymetis.com',
		'myself@company.com',
		'myself@groceries.com'
	];
	const expected = [
		'Kymetis',
		'Company',
		'Groceries'
	];
	for ( let i = 0; i < values.length; i++ ) {
		t.equal( emailToInstitution( values[i] ), expected[i], 'returns expected value when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns a custom institution name if provided an email address that matches an entry in the custom institution map (second parameter)', t => {
	const values = [
		'john.doe@hd.com'
	];
	const expected = [
		'Humpty Dumpty'
	];
	const map = {
		'hd.com': 'Humpty Dumpty'
	};
	for ( let i = 0; i < values.length; i++ ) {
		t.equal( emailToInstitution( values[i], map ), expected[i], 'returns expected value when provided '+values[i] );
	}
	t.end();
});

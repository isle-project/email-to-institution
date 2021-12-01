/**
* Copyright (C) 2021-present The ISLE Authors
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

const tldjs = require( 'tldjs' );
const swot = require( 'swot-simple' );
const capitalize = require( '@stdlib/string-capitalize' );
const isEmailAddress = require( '@stdlib/assert-is-email-address' );
const isObject = require( '@stdlib/assert-is-plain-object' );
const companyMap = require( './company_email_map.json' );
const personalEmails = require( './personal_emails.json' );


// MAIN //

/**
* Returns an institution name corresponding to a supplied email address.
*
* @param {string} email - email address
* @param {Object} [customMap] - custom email address to institution name map
* @throws {TypeError} must provide an email address
* @returns {string} institution name or `Other` if not found
*/
function emailToInstitution( email, customMap ) {
	if ( !isEmailAddress( email ) ) {
		throw new TypeError( 'invalid input argument. First argument mus be an email address. Value: `' + email + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( customMap ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be an object. Value: `' + customMap + '`.' );
		}
	} else {
		customMap = {};
	}
	const name = swot.getInstitutionName( email );
	if ( name ) {
		return name;
	}
	const parts = email.split( '@' );
	let domain = tldjs.getDomain( parts[ parts.length - 1 ] );
	if ( customMap[ domain ] ) {
		return customMap[ domain ];
	}
	if ( companyMap[ domain ] ) {
		return companyMap[ domain ];
	}
	if ( personalEmails.includes( domain ) ) {
		return 'Personal';
	}
	// Remove the suffix from the domain name
	const suffix = tldjs.getPublicSuffix( domain );
	if ( suffix ) {
		domain = domain.slice( 0, -( suffix.length + 1 ) );
	}
	domain = capitalize( domain );
	return domain;
}


// EXPORTS //

module.exports = emailToInstitution;

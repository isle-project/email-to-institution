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

const emailToInstitution = require( './../lib/index.js' );


// MAIN //

let out = emailToInstitution( 'isle@stat.cmu.edu' );
console.log( out );
// => 'Carnegie Mellon University'

out = emailToInstitution( 'jane.doe@gs.com' );
console.log( out );
// => 'Goldman Sachs Group'

out = emailToInstitution( 'admin@kymetis.com' );
console.log( out );
// => 'Kymetis'

out = emailToInstitution( 'anton@hotmail.com' );
console.log( out );
// => 'Personal'

[![Actions Status][actions-image]][actions-url]
[![Coverage][coverage-image]][coverage-url]


# Email to Institution

> Return an institution name corresponding to a supplied email address.

## Usage

```javascript
const emailToInstitution = require( '@isle-project/email-to-institution' );
```

#### emailToInstitution( email\[, customMap] )

Returns an institution name corresponding to a supplied email address.

```javascript
const out = emailToInstitution( 'jane.doe@ups.com' );
// returns 'UPS'
```

If provided an email from a personal email service, the function will return `'Personal'`.

```javascript
const out = emailToInstitution( 'john.doe@hotmail.com' );
// returns 'Personal'
```

The function accepts an optional custom map of domain names to institution names. Entries in the map take precedence over the default map.

```javascript
const map = {
    'ups.com': 'United Parcel Service'
};
const out = emailToInstitution( 'jane.doe@ups.com', map );
```

## Examples

```javascript
const emailToInstitution = require( '@isle-project/email-to-institution' );

let out = emailToInstitution( 'isle@stat.cmu.edu' );
// returns 'Carnegie Mellon University'

out = emailToInstitution( 'jane.doe@gs.com' );
// returns 'Goldman Sachs Group'

out = emailToInstitution( 'admin@kymetis.com' );
// returns 'Kymetis'

out = emailToInstitution( 'anton@hotmail.com' );
// returns 'Personal'
```

[coverage-image]: https://codecov.io/gh/isle-project/email-to-institution/branch/main/graph/badge.svg?token=rHfHB4ZOJL
[coverage-url]: https://codecov.io/gh/isle-project/email-to-institution

[actions-image]: https://github.com/isle-project/email-to-institution/workflows/test/badge.svg
[actions-url]: https://github.com/isle-project/email-to-institution/actions

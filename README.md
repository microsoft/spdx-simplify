![Version](https://img.shields.io/npm/v/spdx-simplify.svg)
![License](https://img.shields.io/github/license/Microsoft/spdx-simplify.svg)
![Downloads](https://img.shields.io/npm/dt/spdx-simplify.svg)

# spdx-simplify
Simplifies a SPDX expression (including ones with sub-expressions) down to a list of license choices. Licenses that are OR'd together will be returned as-is and licenses that are AND'd together will be returned as `MultipleLicenses`.

# Usage
```
var simplify = require('spdx-simplify');
var licenses = simplify('MIT OR BSD-2-Clause'); // Returns: ['MIT', 'BSD-2-Clause']
```

# Contributing
Pull requests will gladly be considered!

This project has adopted the [Microsoft Open Source Code of
Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct
FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com)
with any additional questions or comments.

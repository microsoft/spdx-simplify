var spdx = require('spdx-expression-parse');

function simplify(expression) {
  var licenses = [];
  var resultsToExplore = [];
  try {
    resultsToExplore.push(spdx(expression));
  } catch (e) {
    // Eat parsing exceptions
  }
  var result = resultsToExplore.pop();
  var loopLimit = 100;
  while (result) {
    loopLimit -= 1;
    if (loopLimit <= 0) throw new Error('Loop limit reached for SPDX expression');

    if (result.license) {
      licenses.push(result.license);
    } else if (result.conjunction && result.conjunction === 'and') {
      licenses.push('MultipleLicenses');
    } else if (result.conjunction && result.conjunction === 'or') {
      if (result.left.license) {
        licenses.push(result.left.license);
      } else {
        resultsToExplore.push(result.left);
      }

      if (result.right.license) {
        licenses.push(result.right.license);
      } else {
        resultsToExplore.push(result.right);
      }
    }
    result = resultsToExplore.pop();
  }
  return licenses;
}

module.exports = simplify;
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomUser() {
  const users = [
    'Ashley',
    'Bill',
    'Chris',
    'Dominic',
    'Emma',
    'Faizan',
    'Gimmy',
    'Harry',
    'Ian',
    'John',
    'King',
    'Lisa',
    'Mona',
    'Nina',
    'Olivia',
    'Pete',
    'Queen',
    'Robert',
    'Sarah',
    'Tierra',
    'Una',
    'Varun',
    'Will',
    'Xin',
    'You',
    'Zeba'
  ];

  return users[getRandomArbitrary(0, 10)];
}

function _replacer(match, pIndent, pKey, pVal, pEnd) {
  let key = '<span class=json-key>';
  let val = '<span class=json-value>';
  let str = '<span class=json-string>';
  let r = pIndent || '';

  if (pKey) {
    r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
  }
  if (pVal) {
    r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
  }

  return r + (pEnd || '');
}

function prettyPrint(obj) {
  var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;

  return JSON.stringify(obj, null, 3)
    .replace(/&/g, '&amp;')
    .replace(/\\"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(jsonLine, _replacer);
}

module.exports = {
  getRandomUser,
  prettyPrint
};

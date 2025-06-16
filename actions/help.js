const { getTranslation } = require('../translations');

const help = () => {
  console.log(getTranslation('help'));
};

module.exports = { help };

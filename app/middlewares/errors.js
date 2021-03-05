const RenderError = require('../controllers/RenderError');

/**
 * @module errors This define server errors middleware management
 */
const errors = {
  error404: (_, response) => {
    response.redirect('/error/404');
  },
  error500: (error, request, response, _) => {
    const renderError = new RenderError(request, response);
    renderError.renderHTML500(error);
  },
};
module.exports =  errors;

/** @description validates form fields for editing a book
   *
   * @param {object} fields a form object
   *
   * @returns {object} response object with a validation boolean and a message
   */
const editBookValidation = (fields) => {
  const bookId = parseInt(fields.params.id, 10);
  if (isNaN(bookId)) {
    return {
      message: 'Please enter a valid bookId'
    };
  }
  if (fields.body.quantity) {
    const quantity = parseInt(fields.body.quantity, 10);
    if (isNaN(quantity)) {
      return {
        message: 'Please enter a valid quantity',
        isValid: false
      };
    }
  }
  if (fields.body.categoryId) {
    const categoryId = parseInt(fields.body.categoryId, 10);
    if (isNaN(categoryId)) {
      return {
        message: 'Please enter a valid category',
        isValid: false
      };
    }
  }
  if (Object.keys(fields.body).length < 1) {
    return {
      message: 'There are no changes to modify',
      isValid: false
    };
  }
  return { isValid: true };
};

export default editBookValidation;

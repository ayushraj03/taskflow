export function validateTaskForm(values) {
  const errors = {};

  if (!values.title || !values.title.trim()) {
    errors.title = 'Title is required.';
  } else if (values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  } else if (values.title.trim().length > 100) {
    errors.title = 'Title must be under 100 characters.';
  }

  if (values.description && values.description.length > 500) {
    errors.description = 'Description must be under 500 characters.';
  }

  if (!values.dueDate) {
    errors.dueDate = 'Due date is required.';
  }

  if (!values.status) {
    errors.status = 'Status is required.';
  }

  return errors;
}

export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}

import { useState, useEffect } from 'react';
import { Input, Textarea, Select } from '../../common/Input';
import { Button } from '../../common/Button';
import { STATUS_OPTIONS } from '../../../constants/taskConstants';
import { validateTaskForm, isFormValid } from '../../../utils/validators';
import { TaskStatus } from '../../../types/task.types';
import styles from './TaskForm.module.css';

const EMPTY_FORM = {
  title: '',
  description: '',
  status: TaskStatus.PENDING,
  dueDate: '',
};

export function TaskForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save Task' }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setValues({ ...EMPTY_FORM, ...initialValues });
    } else {
      setValues(EMPTY_FORM);
    }
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validateTaskForm({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateTaskForm(values);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(EMPTY_FORM).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const validationErrors = validateTaskForm(values);
    setErrors(validationErrors);
    if (!isFormValid(validationErrors)) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <div className={styles.fullWidth}>
          <Input
            label="Task Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Implement authentication module"
            error={touched.title ? errors.title : ''}
            required
          />
        </div>

        <div className={styles.fullWidth}>
          <Textarea
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe the task in detail..."
            error={touched.description ? errors.description : ''}
            rows={3}
          />
        </div>

        <Select
          label="Status"
          name="status"
          value={values.status}
          onChange={handleChange}
          options={STATUS_OPTIONS}
          error={touched.status ? errors.status : ''}
          required
        />

        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={values.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.dueDate ? errors.dueDate : ''}
          min={today}
          required
        />
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}

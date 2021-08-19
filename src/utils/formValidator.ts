import * as Yup from 'yup';

const validator = async (
  // eslint-disable-next-line
  data: any,
  // eslint-disable-next-line
  rules: any,
): Promise<{ error?: boolean; data: Record<string, string> }> => {
  try {
    const schema = Yup.object().shape(rules);
    await schema.validate(data, {
      abortEarly: false,
    });

    return { error: false, data: {} };
  } catch (err) {
    const validationErrors: Record<string, string> = {};
    if (err instanceof Yup.ValidationError) {
      err?.inner?.forEach((error) => {
        validationErrors[error.path ?? ''] = error.message;
      });
      return { error: true, data: validationErrors };
    }
    return { error: false, data: {} };
  }
};

export default validator;

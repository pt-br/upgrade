import { useCallback } from 'react';
import { Form } from 'antd';

import { useFormStorage } from '@/hooks/useFormStorage';
import { SignupFormContext } from '@/contexts';

export const SignupFormProvider = ({ children }) => {
  const [form] = Form.useForm();
  const { saveFormData, clearFormData, getFormData } = useFormStorage(form);

  const handleFieldChange = useCallback(() => {
    saveFormData();
  }, [saveFormData]);

  const validateAndProceed = useCallback(
    async (fields) => {
      try {
        await form.validateFields(fields);
        saveFormData();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
    [form, saveFormData]
  );

  const contextValue = {
    form,
    formData: getFormData(),
    handleFieldChange,
    validateAndProceed,
    clearFormData,
  };

  return (
    <SignupFormContext.Provider value={contextValue}>
      {children}
    </SignupFormContext.Provider>
  );
}; 
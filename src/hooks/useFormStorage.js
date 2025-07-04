import { useEffect, useCallback } from 'react';

const STORAGE_KEY = 'signup_form_data';

export const useFormStorage = (form) => {
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.setFieldsValue(parsedData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse saved form data:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [form]);

  const saveFormData = useCallback(() => {
    const currentFormData = form.getFieldsValue();

    const existingData = localStorage.getItem(STORAGE_KEY);
    let existingFormData = {};

    if (existingData) {
      try {
        existingFormData = JSON.parse(existingData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse existing form data:', error);
        existingFormData = {};
      }
    }

    const mergedData = { ...existingFormData, ...currentFormData };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
  }, [form]);

  const clearFormData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getFormData = useCallback(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse saved form data:', error);
        return {};
      }
    }
    return {};
  }, []);

  return {
    saveFormData,
    getFormData,
    clearFormData,
  };
};

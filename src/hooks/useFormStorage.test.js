import { renderHook, act } from '@testing-library/react';

import { mockFormData } from '@/pages/UserData/UserData.mock.js';

import { useFormStorage } from './useFormStorage';

const createMockForm = () => ({
  setFieldsValue: jest.fn(),
  getFieldsValue: jest.fn(),
});

describe('useFormStorage', () => {
  let mockForm;
  let localStorageMock;

  beforeEach(() => {
    mockForm = createMockForm();
    localStorageMock = global.localStorageMock;

    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it('should load saved form data on mount', () => {
    const savedData = mockFormData;
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedData));

    renderHook(() => useFormStorage(mockForm));

    expect(localStorageMock.getItem).toHaveBeenCalledWith('signup_form_data');
    expect(mockForm.setFieldsValue).toHaveBeenCalledWith(savedData);
  });

  it('should save current form data to localStorage', () => {
    const currentData = mockFormData;
    mockForm.getFieldsValue.mockReturnValue(currentData);

    const { result } = renderHook(() => useFormStorage(mockForm));

    act(() => {
      result.current.saveFormData();
    });

    expect(mockForm.getFieldsValue).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'signup_form_data',
      JSON.stringify(currentData)
    );
  });

  it('should merge with existing data when saving', () => {
    const existingData = { firstName: 'Test', age: 30 };
    const currentData = { ...mockFormData, age: 31 };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(existingData));
    mockForm.getFieldsValue.mockReturnValue(currentData);

    const { result } = renderHook(() => useFormStorage(mockForm));

    act(() => {
      result.current.saveFormData();
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'signup_form_data',
      expect.stringContaining(`"firstName":"${mockFormData.firstName}"`)
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'signup_form_data',
      expect.stringContaining(`"email":"${mockFormData.email}"`)
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'signup_form_data',
      expect.stringContaining('"age":31')
    );
  });

  it('should remove form data from localStorage', () => {
    const { result } = renderHook(() => useFormStorage(mockForm));

    act(() => {
      result.current.clearFormData();
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      'signup_form_data'
    );
  });

  it('should return parsed form data from localStorage', () => {
    const savedData = mockFormData;
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedData));

    const { result } = renderHook(() => useFormStorage(mockForm));

    const retrievedData = result.current.getFormData();

    expect(retrievedData).toEqual(savedData);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('signup_form_data');
  });

  it('should return empty object when no data exists', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useFormStorage(mockForm));

    const retrievedData = result.current.getFormData();

    expect(retrievedData).toEqual({});
  });
});

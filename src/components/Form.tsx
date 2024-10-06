'use client';

import React, { useState } from 'react';
import Button from './Button';
import InputField from './InputField';

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
};

type FormProps = {
  fields: Field[];
  onSubmit: (formData: { [key: string]: string }) => void;
};

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // const handleClear = () => {
  //   setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
  // };

  return (
    <form onSubmit={handleSubmit} className='rounded-2xl p-8 space-y-6 relative'>
      {fields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name]}
          onChange={handleChange}
        />
      ))}
      <div className="flex justify-center items-center p-10">
        <div className="flex justify-center items-center text-center">
        <Button type="submit" variant="primary">Submit Your Guess</Button>
        {/* <p className='underline text-gray-400' onClick={handleClear}>Clear</p> */}
        </div>
      </div>
    </form>
  );
};

export default Form;

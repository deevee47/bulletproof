'use client';

import React, { useState, useEffect } from 'react';
import Button from './Button';
import InputField from './InputField';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type Field = {
  name: string;
  label: string;
  type?: string ; // Add other types you need here
  placeholder: string;
  required?: boolean;
};


type FormProps = {
  fields: Field[];
  onSubmit: (formData: { [key: string]: string }) => void;
};

// Access environment variables
const SUBMISSION_LIMIT = parseInt(process.env.NEXT_PUBLIC_SUBMISSION_LIMIT || '5', 10);
const COOLDOWN_PERIOD = parseInt(process.env.NEXT_PUBLIC_COOLDOWN_PERIOD || '60000', 10);
const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

const SUBMISSION_STORAGE_KEY = 'form_submissions';
const LAST_SUBMISSION_KEY = 'last_submission_time';

interface SubmissionHistory {
  count: number;
  timestamp: number;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    const storedHistory = localStorage.getItem(SUBMISSION_STORAGE_KEY);
    const storedLastSubmission = localStorage.getItem(LAST_SUBMISSION_KEY);

    if (storedHistory) {
      const history: SubmissionHistory = JSON.parse(storedHistory);
      const now = Date.now();

      if (now - history.timestamp > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(SUBMISSION_STORAGE_KEY);
        localStorage.removeItem(LAST_SUBMISSION_KEY);
      } else {
        setSubmissionCount(history.count);
      }
    }

    if (storedLastSubmission) {
      setLastSubmissionTime(parseInt(storedLastSubmission));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldownRemaining > 0) {
      timer = setInterval(() => {
        const remaining = Math.max(0, COOLDOWN_PERIOD - (Date.now() - lastSubmissionTime));
        setCooldownRemaining(remaining);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownRemaining, lastSubmissionTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateSubmissionHistory = () => {
    const newCount = submissionCount + 1;
    setSubmissionCount(newCount);
    localStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify({
      count: newCount,
      timestamp: Date.now()
    }));

    const now = Date.now();
    setLastSubmissionTime(now);
    localStorage.setItem(LAST_SUBMISSION_KEY, now.toString());
    setCooldownRemaining(COOLDOWN_PERIOD);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      console.log('Honeypot triggered');
      return;
    }

    if (submissionCount >= SUBMISSION_LIMIT) {
      setSubmitError('Maximum submission limit reached for today.');
      return;
    }

    const timeSinceLastSubmission = Date.now() - lastSubmissionTime;
    if (timeSinceLastSubmission < COOLDOWN_PERIOD) {
      const remainingTime = Math.ceil((COOLDOWN_PERIOD - timeSinceLastSubmission) / 1000);
      setSubmitError(`Please wait ${remainingTime} seconds before submitting again.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error('Could not create iframe document');

      const form = iframeDoc.createElement('form');
      form.action = GOOGLE_FORM_URL || '';
      form.method = 'POST';

      Object.entries(formData).forEach(([name, value]) => {
        const input = iframeDoc.createElement('input');
        input.type = 'text';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      iframeDoc.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);

      updateSubmissionHistory();
      onSubmit(formData);

      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    } catch {
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='rounded-2xl p-8 space-y-6 relative'>
      <input
        type="text"
        name="_gotcha"
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {fields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name]}
          placeholder={field.placeholder}
          onChange={handleChange}
          required={field.required}
        />
      ))}

      {submitError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-center items-center p-10">
        <div className="flex flex-col justify-center items-center text-center space-y-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={cooldownRemaining > 0 || submissionCount >= SUBMISSION_LIMIT}
          >
            Reserve my seat!
          </Button>
          {cooldownRemaining > 0 && (
            <p className="text-sm text-gray-400">
              Please wait {Math.ceil(cooldownRemaining / 1000)} seconds before submitting again
            </p>
          )}
          {submissionCount > 0 && (
            <p className="text-sm text-gray-400">
              Submissions today: {submissionCount}/{SUBMISSION_LIMIT}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;

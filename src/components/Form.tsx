'use client';

import React, { useState, useEffect } from 'react';
import Button from './Button';
import InputField from './InputField';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
};

type FormProps = {
  fields: Field[];
  onSubmit: (formData: { [key: string]: string }) => void;
};

const SUBMISSION_LIMIT = 5;
const COOLDOWN_PERIOD = 60 * 1000; // 1 minute in milliseconds
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
    // Load submission history from localStorage
    const storedHistory = localStorage.getItem(SUBMISSION_STORAGE_KEY);
    const storedLastSubmission = localStorage.getItem(LAST_SUBMISSION_KEY);

    if (storedHistory) {
      const history: SubmissionHistory = JSON.parse(storedHistory);
      const now = Date.now();

      // Reset if it's been more than 24 hours
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

    // Honeypot check
    if (honeypot) {
      console.log('Honeypot triggered');
      return;
    }

    // Submission limit check
    if (submissionCount >= SUBMISSION_LIMIT) {
      setSubmitError('Maximum submission limit reached for today.');
      return;
    }

    // Cooldown period check
    const timeSinceLastSubmission = Date.now() - lastSubmissionTime;
    if (timeSinceLastSubmission < COOLDOWN_PERIOD) {
      const remainingTime = Math.ceil((COOLDOWN_PERIOD - timeSinceLastSubmission) / 1000);
      setSubmitError(`Please wait ${remainingTime} seconds before submitting again.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create a hidden iframe
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Create a form inside the iframe
      const iframeDoc = iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error('Could not create iframe document');

      const form = iframeDoc.createElement('form');
      form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSdBo95jE1qZv9v5TnibvsipYDcuqDjJoH5J15_LS4ubpkFQXg/formResponse';
      form.method = 'POST';

      // Add form data to the iframe form
      Object.entries(formData).forEach(([name, value]) => {
        const input = iframeDoc.createElement('input');
        input.type = 'text';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      iframeDoc.body.appendChild(form);

      // Submit the form and handle the response
      form.submit();

      // Clean up the iframe after submission
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);

      // Update submission history
      updateSubmissionHistory();

      // Call onSubmit callback
      onSubmit(formData);

      // Clear form data
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    } catch (error) {
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='rounded-2xl p-8 space-y-6 relative'>
      {/* Honeypot field - hidden from users */}
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
            Submit Your Guess
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
import React, { useState } from 'react';
import Model from '../other/Model';
import EmailInput from '@/components/inputs/EmailInput';
import PasswordInput from '@/components/inputs/PasswordInput';
import { Button } from "@/components/designSystem/button";
import { patientService } from '@/services/dentist/patientService';
import toast from 'react-hot-toast';

const AddPatientAccModel = ({ isOpen, onClose, id, refreshPatients }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    setLoading(true);

    const { data } = await patientService.createPatientAccount(id, email, password);

    if (data?.success) {
      toast.success("Patient account created successfully!");
      refreshPatients()
      onClose();
    } else {
      toast.error(data?.message || "Failed to create account!");
    }

    setLoading(false);
  };

  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Create Account For Patient</h2>
      <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password..."
        label="Password"
      />

      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </Model>
  );
};

export default AddPatientAccModel;

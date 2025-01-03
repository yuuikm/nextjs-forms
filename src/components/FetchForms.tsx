// FetchForms.js
import React, { useEffect, useState } from "react";
import FormCard, { FormCardSkeleton } from "@/components/FormCard";
import { Form } from "@prisma/client";

const FetchForms = ({ userId }: { userId: string }) => {
  const [forms, setForms] = useState<Form[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      const response = await fetch(`/api/forms?userId=${userId}`);
      const data = await response.json();
      setForms(data);
      setLoading(false);
    };
    fetchForms();
  }, [userId]);

  if (loading) {
    return [1, 2, 3, 4].map((e) => <FormCardSkeleton key={e} />);
  }

  return (
    <>
      {forms.map((form) => (
        <FormCard formData={form} key={form.id} />
      ))}
    </>
  );
};

export default FetchForms;

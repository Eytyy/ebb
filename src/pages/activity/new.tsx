import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import type { ChangeEvent } from "react";
import NewActivityNav from "~/components/nav/NewActivityNav";
import CategoryStep from "~/components/new-activity/CategoryStep";
import NameStep from "~/components/new-activity/NameStep";
import TypeStep from "~/components/new-activity/TypeStep";
import Submitting from "~/components/timer/submitting";
import { api } from "~/utils/api";

type State = {
  name: string;
  category: string;
  type: "timer" | "count";
  step: number;
};

const initialState: State = {
  name: "",
  category: "",
  type: "timer",
  step: 1,
};

export default function NewActivity() {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const { data: categories } = api.activity.getCategories.useQuery();

  const { mutate: create, isLoading } = api.activity.create.useMutation({
    onSuccess: () => {
      void router.push("/dashboard");
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.name, e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // this is to handle updating the state of the category input
  // when the user clicks on a suggestion from the list
  const updateCategory = (value: string) => {
    setState((state) => ({
      ...state,
      category: value,
    }));
  };

  const handleSubmit = () => {
    if (state.name === "" || state.category === "") {
      return false;
    }
    const category = categories?.find((c) => c.name === state.category) ?? {
      name: state.category,
    };

    create({
      ...state,
      category,
    });
    setState(initialState);
    setSubmitting(true);
  };

  const goToNextStep = () => {
    if (state.step === 4) return void 0;
    setState((state) => ({ ...state, step: state.step + 1 }));
  };

  const goToStep = (step: number) => {
    setState((state) => ({ ...state, step }));
  };

  const { step, category, name, type } = state;

  if (isLoading || submitting) {
    return <Submitting />;
  }

  return (
    <>
      <NewActivityNav
        onSubmit={handleSubmit}
        onNext={goToNextStep}
        goToStep={goToStep}
        step={step}
        lastStep={3}
      />
      <div className="space-y-10 pt-16 text-4xl font-bold">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <NameStep key="name" onChange={handleChange} value={name} />
          )}
          {step === 2 && (
            <CategoryStep
              key="category"
              categories={categories}
              value={category}
              onChange={handleChange}
              update={updateCategory}
              activityName={state.name}
            />
          )}
          {step === 3 && (
            <TypeStep
              key="type"
              onChange={handleChange}
              value={type}
              activityName={name}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

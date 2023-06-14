import { useRouter } from "next/router";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import Layout from "~/components/layout";
import { api } from "~/utils/api";

const initialState = {
  name: "",
  category: { name: "", id: "" },
  type: "timer",
};

export default function NewActivity() {
  const [state, setState] = useState(initialState);
  const create = api.activity.create.useMutation({
    onSuccess: () => {
      void router.push("/track");
    },
  });
  const router = useRouter();

  const handleCategoryChange = (category: { name: string; id: string }) => {
    setState((state) => ({ ...state, category }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (state.name === "" || state.category.id === "" || state.type === "") {
      return false;
    }

    create.mutate(state);
    setState(initialState);
  };

  return (
    <>
      <div className="space-y-10 text-4xl font-bold">
        <TextInput name="name" onChange={handleChange} />
        <CreateCategory onChange={handleCategoryChange} />
        <div className="">
          <label htmlFor="">type</label>
          <select
            id="type"
            value={state.type}
            onChange={handleChange}
            className=" color-white border-2 border-[rgba(255,255,255,0.5)] bg-black"
          >
            <option value="timer">Timer</option>
            <option value="count">Count</option>
          </select>
        </div>
        <button
          className="rounded-3xl bg-white px-4 py-1 text-2xl font-normal text-black"
          onClick={handleSubmit}
        >
          create
        </button>
      </div>
    </>
  );
}

function CreateCategory({
  onChange,
}: {
  onChange: (c: { name: string; id: string }) => void;
}) {
  const { data: categories } = api.activity.getCategories.useQuery();

  const [suggestions, setSuggestions] = useState<typeof categories>([]);
  const [value, setValue] = useState("");
  const [createBtnVisible, setCreateBtnVisible] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  function suggest() {
    if (!ref.current) return;
    const value = ref.current.value.toLowerCase();
    const suggestions = categories?.filter((category) => {
      return (
        value.trim() !== "" &&
        category.name.toLowerCase().includes(value.trim())
      );
    });

    if (value !== "" && suggestions?.length === 0) {
      setCreateBtnVisible(true);
    } else {
      setCreateBtnVisible(false);
    }

    setSuggestions(suggestions ?? []);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    suggest();
  };

  const updateCategory = (category: { name: string; id: string }) => {
    onChange(category);
    setValue(category.name);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="flex gap-2">
        <label htmlFor="category">category</label>
        <div className="relative">
          <input
            id="category"
            ref={ref}
            value={value}
            onChange={handleChange}
            className="color-white border-b-2 border-[rgba(255,255,255,0.5)] bg-black outline-none"
            type="text"
          />
          {suggestions && suggestions?.length > 0 && (
            <div className="absolute left-0 top-10 w-full bg-[#222]">
              {suggestions?.map((category) => (
                <div
                  key={category.id}
                  onClick={() => {
                    updateCategory(category);
                  }}
                  className="cursor-pointer p-2 hover:bg-gray-700"
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {createBtnVisible && (
        <p className="text-lg font-normal">
          <span className="font-bold">[ {value} ]</span>
          {` is not a category yet, but we'll create it automatically for you.`}
        </p>
      )}
    </div>
  );
}

function TextInput({
  name,
  onChange,
}: {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="">
      <label htmlFor={name} className="mr-4">
        {name}
      </label>
      <input
        id={name}
        onChange={onChange}
        className="color-white border-b-2 border-[rgba(255,255,255,0.5)] bg-black outline-none"
        type="text"
      />
    </div>
  );
}

import { useSession } from "next-auth/react";
import React from "react";

export default function Onboard() {
  const [state, setState] = React.useState({ step: 0 });
  const { data: sessionData } = useSession();

  if (!sessionData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-10">
      <div className="mb-10 text-2xl">
        {state.step === 0 && (
          <>
            Hey {sessionData.user.name?.split(" ")[0]}! What would you like to
            track?
            <input
              onChange={handleChange}
              type="text"
              id="name"
              className="ml-4 bg-transparent outline-none"
            />
          </>
        )}
        {state.step === 1 && (
          <>
            What type of activity is this?
            <input
              onChange={handleChange}
              type="text"
              id="category"
              className="ml-4 bg-transparent outline-none"
            />
          </>
        )}
        {state.step === 2 && (
          <>
            What type of tracker would you like to use?
            <input
              onChange={handleChange}
              type="text"
              id="type"
              className="ml-4 bg-transparent outline-none"
            />
          </>
        )}
        <button onClick={() => setState({ ...state, step: state.step + 1 })}>
          Next
        </button>
        {state.step === 3 && <button onClick={() => void 0}>Submit</button>}
      </div>
      <div></div>
    </div>
  );
}

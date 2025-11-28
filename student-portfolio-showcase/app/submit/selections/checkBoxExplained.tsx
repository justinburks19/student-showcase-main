import { useState } from "react";

// Reusable checkbox with a label
type CheckBoxExplainedProps = {
  name: string;
  label: string;
  mapValue: string[];
  required?: boolean;
};

// Checkbox component to render a list of checkboxes with explanation
export function CheckBoxExplained({
  name,
  label,
  mapValue,
  required = true,
}: CheckBoxExplainedProps) {
  // Track which options are selected
  const [select, setSelect] = useState<Record<string, boolean>>({});
  const [check, setCheck] = useState(false); // “is any selected?”

  const handleChange =
    (method: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;

      setSelect((prev) => {
        const next = { ...prev, [method]: checked }; // update this method's state

        // compute if ANY box is selected from the *updated* state
        const anySelected = Object.values(next).some(Boolean);
        setCheck(anySelected);

        return next;
      });
    };

  return (
    <>
      <label
        htmlFor={name}
        className="block font-medium text-gray-700 mb-1 border-black"
      >
        <h1 className="text-2xl font-md font-semibold">{label}</h1>
      </label>

      <div className="flex flex-row border-black flex-wrap gap-2 mb-2 border-x-[2px] border-t-[3px] border-b-[5px] p-2 rounded-2xl font-bold w-[90%] mx-auto justify-center align-center">
        {mapValue.map((method: string, index: number) => {
          const id = `${name}-checkbox-${method}`;
          const explanationID = `${method}-explanation`;
          const isChecked = !!select[method];

          return (
            <div key={index} className="flex flex-col mx-auto mb-1">
              <input
                type="checkbox"
                id={id}
                name={name}
                value={method}
                className="mr-1"
                required={required && !check} // ✅ “at least one” logic
                onChange={handleChange(method)}
                checked={isChecked}
              />
              <label
                htmlFor={id}
                className="text-md font-medium text-gray-700 "
              >
                {method}
              </label>

              {isChecked && (
                <input
                  type="text"
                  id={explanationID}
                  name={`${method}-explanation`}
                  placeholder={`Link it!`}
                  className="border-gray-400 text-center w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[2px] border-b-[2px]"
                  required={required && isChecked}
                />
              )}
            </div>
          );
        })}

        <div className="w-full">
          <input
            type="url"
            id={`${name}-other`}
            name={`${name}-other`}
            placeholder={`Other ${label}: (link it!)`}
            className="border-gray-400 text-center w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[2px] border-b-[2px]"
          />
        </div>
      </div>
    </>
  );
}

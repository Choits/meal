/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export function ToggleSwitch({ checked, onChange, id }: ToggleSwitchProps) {
  return (
    <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
          checked ? "bg-deep-olive" : "bg-soft-gray"
        }`}
      >
        <span
          className={`block w-4 h-4 rounded-full bg-card-white shadow-md transform transition-transform duration-200 ease-in-out mt-1 ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </label>
    </div>
  );
}
export default ToggleSwitch;

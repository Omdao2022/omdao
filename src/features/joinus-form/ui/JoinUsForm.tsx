import React, { FC, useState } from "react";
import { Logo, Nav } from "../../../shared/ui";
import { InputBox } from "./InputBox";
import { CountrySelector } from './CountryPicker';
import { FiUsers } from "react-icons/fi";
import { COUNTRIES } from "./CountryPicker/lib/countries";
import { SelectMenuOption } from "./CountryPicker/lib/types";

interface JoinUsFormProps {
  nextScene: () => void; // Define the type of nextScene
}

interface FormData {
  firstName: string,
  lastName: string,

}

export const JoinUsForm: FC<JoinUsFormProps> = ({ nextScene}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    // Default this to a country's code to preselect it
    const [country, setCountry] = useState<SelectMenuOption["value"]>("BE");

  const inputProps1 = [
    {
      label: "First Name",
      type: "text",
      placeholder: "John",
      icon: <FiUsers />,
    },
    {
      label: "Second Name",
      type: "text",
      placeholder: "Doe",
      icon: <FiUsers />,
    },
    {
      label: "Birthday",
      type: "date",
      placeholder: "1990-01-01",
      icon: <FiUsers />,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "example@mail.com",
      icon: <FiUsers />,
    },
  ];

  const inputProps2 = [
    {
      label: "Location",
      type: "text",
      placeholder: "Location",
      icon: <FiUsers />,
    },
    {
      label: "Address",
      type: "text",
      placeholder: "Address",
      icon: <FiUsers />,
    },
    {
      label: "Zipcode",
      type: "text",
      placeholder: "70000",
      icon: <FiUsers />,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Example validation
    if (e.target.value.length < 3) {
      setError("Input must be at least 3 characters long");
    } else {
      setError("");
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center">
          <h2 className="text-[#CB4D8C] font-sans">Join Us</h2>
        </div>

        <div className="grid md:grid-rows-2 grid-rows-1">
          {inputProps1.map((item) => {
            return (
              <InputBox
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                value={inputValue}
                onChange={handleChange}
                error={error}
                icon={item.icon}
              />
            );
          })}
          <CountrySelector
            id={"country-selector"}
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            onChange={setCountry}
            selectedValue={COUNTRIES.find((option) => option.value === country)}
          />
          {inputProps2.map((item) => {
            return (
              <InputBox
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                value={inputValue}
                onChange={handleChange}
                error={error}
                icon={item.icon}
              />
            );
          })}
          <button className="col-span-2 mt-5 bg-[#CB4D8C] rounded-md p-3 active:scale-90 transition-transform ease-in-out delay-150" onClick={nextScene}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

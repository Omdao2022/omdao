import React, { FC, useState } from "react";
import { Logo, Nav } from "../../../shared/ui";
import { InputBox } from "./InputBox";
import { FiUsers } from "react-icons/fi";

export const JoinUsForm: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

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
        <div className="flex flex-row">
          <InputBox
            label="First Name"
            type="text"
            placeholder="John"
            value={inputValue}
            onChange={handleChange}
            error={error}
            icon={<FiUsers />}
          />
          <InputBox
            label="Second Name"
            type="text"
            placeholder="Doe"
            value={inputValue}
            onChange={handleChange}
            error={error}
            icon={<FiUsers />}
          />
        </div>
        <div className="flex flex-row">
          <InputBox
            label="Birthday"
            type="date"
            value={inputValue}
            onChange={handleChange}
            error={error}
            icon={<FiUsers />}
          />
          <InputBox
            label="Your Input"
            type="text"
            placeholder="Enter something..."
            value={inputValue}
            onChange={handleChange}
            error={error}
            icon={<FiUsers />}
          />
        </div>
        <div className="flex flex-row">
          <InputBox
            label="Your Input"
            type="text"
            placeholder="Enter something..."
            value={inputValue}
            onChange={handleChange}
            error={error}
            icon={<FiUsers />}
          />
          <InputBox
            label="Your Input"
            type="text"
            placeholder="Enter something..."
            value={inputValue}
            onChange={handleChange}
            error={error}
            icon={<FiUsers />}
          />
        </div>
        <button>Next</button>
      </div>
    </>
  );
};

import React, { FC } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { LanguageCode, LanguageName } from "../types";

const languages: LanguageCode[] = [
  "es",
  "en",
  "fr",
  "de",
  "pl",
  "it",
  "pt",
  "hi",
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const LanguageSelect: FC<{
  value: LanguageCode;
  onSelect: (language: LanguageCode) => void;
}> = ({ value, onSelect }) => {
  return (
    <Listbox value={value} onChange={onSelect}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-12 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg">
              <span className="block truncate w-24">{LanguageName[value]}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {languages.map((language) => (
                  <Listbox.Option
                    key={language}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-500",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={language}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {LanguageName[language]}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-2",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default LanguageSelect;

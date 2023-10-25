import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import orase from "../assets/orase.json";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredOrase =
    query === ""
      ? orase
      : orase.filter((oras) => {
          return oras.name.toLowerCase().includes(query.toLowerCase());
        });

  //TODO: TEST THIS, MIGHT RERENDER INFINITELY

  useEffect(() => {
    setSelected("");
  }, [query]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        navigate(`/orase/${selected.toLowerCase()}`);
        window.scrollTo(0, 0);
        setSelected("");
        setQuery("");
      }}
      className="relative z-50 w-80"
    >
      <Combobox value={selected} onChange={setSelected} name="oras">
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-base-300 sm:text-sm">
            <Combobox.Input
              className="input input-bordered w-full text-sm leading-5 text-gray-900"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cauta un oras..."
              spellCheck={true}
              autoComplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-5 max-h-60 w-full overflow-auto rounded-md bg-white p-1 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOrase.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nu am gasit un oras cu acest nume.
                </div>
              ) : (
                filteredOrase.map((oras) => (
                  <Combobox.Option
                    key={oras.name}
                    onClick={() => {
                      navigate(`/orase/${oras.name.toLowerCase()}`);
                      window.scrollTo(0, 0);
                      setSelected("");
                      setQuery("");
                    }}
                    className={({ active }) =>
                      `relative select-none px-4 py-2 capitalize hover:cursor-pointer ${
                        active
                          ? "rounded-md bg-base-200 text-black"
                          : "text-gray-900"
                      }`
                    }
                    value={oras.name}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {oras.name}
                        </span>
                        {/* {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-black" : "text-gray-700"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </span>
                        ) : null} */}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </form>
  );
}

export default SearchBar;

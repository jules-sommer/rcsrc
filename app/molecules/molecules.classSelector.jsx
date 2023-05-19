"use client"

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { CHEMICAL_SCAFFOLDS } from './molecules.productList'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Selector() {

  const [selected, setSelected] = useState(CHEMICAL_SCAFFOLDS[0])

  return (

    <div className='flex flex-col'>

      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-sky-200">Sort by:</Listbox.Label>
            <div className="relative mt-2">

              <Listbox.Button className="relative w-full min-w-[200px] cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {CHEMICAL_SCAFFOLDS.map((scaffold) => (
                    <Listbox.Option
                      key={scaffold.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-3 pl-3 pr-9'
                        )
                      }
                      value={scaffold.name}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img src={scaffold.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {scaffold.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
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

    </div>

  )
}
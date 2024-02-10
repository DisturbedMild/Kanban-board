import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import { IColumn } from '../types/types';

type BoardDropDownProps = {
  column: IColumn;
  removeBoard: (column: IColumn) => void;
  sortTasks: (sortType: string, column: IColumn) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function BoardDropDown({ removeBoard, sortTasks, column }: BoardDropDownProps) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='py-1 text-sm font-semibold'>
          <EllipsisVerticalIcon className='-mr-1 h-5 w-5 text-white' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => sortTasks('author', column)}
                >
                  Sort by Author
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => sortTasks('date', column)}
                >
                  Sort by Date
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => sortTasks('title', column)}
                >
                  Sort by Title
                </a>
              )}
            </Menu.Item>
          </div>

          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => removeBoard(column)}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

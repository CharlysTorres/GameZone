import React from 'react';
import { Dropdown as DropDown } from 'rsuite';
import { WithAsProps } from 'rsuite/esm/internals/types';
import { useAuth } from '../../hooks/useAuth';

interface DropdownProps {
  icon: 'bxs-cog' | 'bx-user' | 'bx-menu' | 'bx-dots-vertical-rounded' | 'bx-dots-horizontal-rounded';
}

export function Dropdown({icon}: DropdownProps) {
  const { logout } = useAuth();

  async function signOut() {
    await logout();
  }

  const renderButtonIcon = (props: WithAsProps, ref: React.Ref<HTMLButtonElement>) => {
    return (
      <button {...props} ref={ref} className='bg-transparent text-4xl hover:text-violet-500 cursor-pointer text-[#2E384D]'>
        <i className={`bx ${icon}`} id='config-icon' ></i>
      </button>
    );
  }; 

  return (
    <DropDown
      renderToggle={renderButtonIcon}
      placement='bottomEnd'
    >
      {/* <DropDown.Item style={{ padding: 10, width: 160 }}>Your profile</DropDown.Item>
      <DropDown.Item>Your stars</DropDown.Item>
      <DropDown.Item>Your Gists</DropDown.Item>
      <DropDown.Separator />
      <DropDown.Item>Help</DropDown.Item>
      <DropDown.Item>Settings</DropDown.Item> */}
      <DropDown.Item style={{ padding: 10, width: 160 }} onClick={() => signOut()}><i className='bx bx-log-out mr-1' ></i> Logout</DropDown.Item>
    </DropDown>
  );
}

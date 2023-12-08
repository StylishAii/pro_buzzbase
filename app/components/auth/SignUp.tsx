"use client";

import { EyeFilledIcon } from "@app/components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@app/components/icon/EyeSlashFilledIcon";
import { MailIcon } from "@app/components/icon/MailIcon";
import { Input } from "@nextui-org/react";
import React from "react";

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <>
      <form>
        <Input
          className="caret-zinc-400"
          type="email"
          label="Email"
          placeholder="you@example.com"
          labelPlacement="outside"
          startContent={
            <MailIcon
              aria-hidden={true}
              fill="#71717A"
              focusable={false}
              height="1em"
              role="presentation"
              viewBox="0 0 24 24"
              width="1em"
              className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
            />
          }
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          labelPlacement="outside"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <EyeSlashFilledIcon
                  aria-hidden={true}
                  fill="#71717A"
                  focusable={false}
                  height="1em"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="1em"
                  className="text-2xl text-default-400 pointer-events-none"
                />
              ) : (
                <EyeFilledIcon
                  aria-hidden={true}
                  fill="#71717A"
                  focusable={false}
                  height="1em"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="1em"
                  className="text-2xl text-default-400 pointer-events-none"
                />
              )}
            </button>
          }
          type={isPasswordVisible ? "text" : "password"}
          className="max-w-xs"
        />
        <Input
          label="Password Confirmation"
          placeholder="Enter your password"
          labelPlacement="outside"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleConfirmVisibility}
            >
              {isConfirmVisible ? (
                <EyeSlashFilledIcon
                  aria-hidden={true}
                  fill="#71717A"
                  focusable={false}
                  height="1em"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="1em"
                  className="text-2xl text-default-400 pointer-events-none"
                />
              ) : (
                <EyeFilledIcon
                  aria-hidden={true}
                  fill="#71717A"
                  focusable={false}
                  height="1em"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="1em"
                  className="text-2xl text-default-400 pointer-events-none"
                />
              )}
            </button>
          }
          type={isConfirmVisible ? "text" : "password"}
          className="max-w-xs"
        />
      </form>
    </>
  );
}

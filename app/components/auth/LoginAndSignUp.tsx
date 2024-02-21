"use client";
import "@mantine/core/styles.css";
import { Group } from "@mantine/core";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useAuthContext } from "@app/contexts/useAuthContext";

export default function LoginAndSignUp() {
  const { isLoggedIn, loading } = useAuthContext();
  if (loading) {
    return <></>;
  }
  return (
    <>
      {isLoggedIn ? (
        <></>
      ) : (
        <>
          <Group mt={30}>
            <Button
              color="default"
              size="lg"
              radius="sm"
              as={Link}
              href="/signin"
              className="bg-white text-zinc-800 font-medium py-3"
            >
              ログイン
            </Button>
            <Button
              color="primary"
              size="lg"
              radius="sm"
              as={Link}
              href="/signup"
              className="font-medium py-2"
            >
              新規登録
            </Button>
          </Group>
        </>
      )}
    </>
  );
}

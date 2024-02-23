"use client";
import { SearchIcon } from "@app/components/icon/SearchIcon";
import { Divider, Input, Spinner, User } from "@nextui-org/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  user_id: string;
  image: { url: string };
}

export default function UserAutocomplete() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return setUsers([]);

    const fetchUsers = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/search?query=${query}`
      );
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    };

    fetchUsers();
  }, [query]);

  const clearInput = () => {
    setQuery("");
    setUsers([]);
  };

  return (
    <div className="mt-4">
      <Input
        isClearable
        radius="lg"
        placeholder="ユーザー名・ユーザーIDで検索..."
        variant="faded"
        startContent={<SearchIcon width="18" height="18" stroke="#f4f4f4" />}
        value={query}
        onClear={() => clearInput()}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-md mx-auto"
      />
      <ul className="grid gap-y-4 mt-6">
        {isLoading ? (
          <li className="flex justify-center mx-auto">
            <Spinner color="primary" />
          </li>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              <Link href={`/mypage/${user.user_id}/`} className="block">
                <User
                  name={user.name}
                  description={`@${user.user_id}`}
                  avatarProps={{
                    src:
                      process.env.NODE_ENV === "production"
                        ? user.image.url
                        : `${process.env.NEXT_PUBLIC_API_URL}${user.image.url}`,
                  }}
                />
              </Link>
              <Divider className="mt-2" />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

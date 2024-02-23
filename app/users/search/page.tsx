import UserAutocomplete from "@app/components/search/Autocomplete";

export default function UserSearch() {
  return (
    <>
      <div className="bg-main pb-24">
        <div className="py-16 px-4 max-w-[720px] mx-auto lg:m-[0_auto_0_28%] lg:border-x-1 lg:border-b-1 lg:border-zinc-500">
          <h2 className="text-base text-center">ユーザーを検索しよう！</h2>
          <div>
            <UserAutocomplete />
          </div>
        </div>
      </div>
    </>
  );
}

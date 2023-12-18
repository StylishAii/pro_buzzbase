import React, { useEffect } from "react";
import Link from "next/link";

export default function RegistrationConfirmation() {

  return (
    <>
      <div className="px-4 pt-32">
        <h2 className="text-lg bold mb-8">
          BuzzBaseへご登録ありがとうございます！
        </h2>
        <p className=" text-base leading-6">
          あなたのメールアドレス（user@example.com）にアカウント確認メールを送信しました。
          <br></br>
          メール内のリンクをクリックして、登録を完了してください。メールが見つからない場合は、迷惑メールフォルダを確認するか、
          <Link href="/signup" className=" text-blue-400">
            こちら
          </Link>
          をクリックして再度ご登録をお願いします。
        </p>
      </div>
    </>
  );
}

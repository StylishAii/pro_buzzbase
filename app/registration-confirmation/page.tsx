import React from "react";

export default function RegistrationConfirmation() {
  return (
    <>
      <div className="px-4 pt-32 max-w-[720px] mx-auto">
        <h2 className="text-lg bold mb-8">
          BuzzBaseへご登録ありがとうございます！
        </h2>
        <p className=" text-base leading-6">
          入力したメールアドレス宛にアカウント確認メールを送信しました。
          <br></br>
          メール内のリンクをクリックして、登録を完了してください。メールが見つからない場合は、迷惑メールフォルダを確認するか、再度ご登録をお願いします。
        </p>
      </div>
    </>
  );
}

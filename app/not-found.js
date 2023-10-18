import PrimaryButton from "@/components/UI/buttons/PrimaryButton";

export default function Custom404() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container">
      <h1 className="font-heading text-[48px] text-center mb-[12px] font-light -tracking-[0.528px] leading-[1.2]">
        Помилка 404 :(</h1>
      <h2 className="text-[24px] text-center mb-[32px]  -tracking-[0.264px] leading-[1.5]">
        Здається, ви потрапили на цю сторінку помилково. Сторінку, яку ви
        шукали, віднесло в гори. Будь ласка, скористайтесь навігацією, щоб
        повернутися назад до цивілізації
      </h2>
      <div className="flex items-center justify-center">
      <PrimaryButton message={"Повернутися назад"}/>
      </div>
      </div>
    </div>
  );
}
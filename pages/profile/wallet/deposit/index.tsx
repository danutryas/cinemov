import Button from "@/components/button/button";
import useUser from "@/lib/hooks/useUser";
import { useState } from "react";

const DepositPage = () => {
  const { user } = useUser();

  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [dataTransaction, setDataTransaction] = useState<any>(null);
  const paymentMethod = ["Shoopepay", "Dana", "Gopay", "OVO"];

  const onNext = () => {
    setDataTransaction((prev: any) => ({
      ...prev,
      amount: depositAmount,
    }));
  };
  const onClickPayment = (name: string) => {
    setDataTransaction((prev: any) => ({
      ...prev,
      method: name,
    }));
  };
  const onCancelPayment = () => {
    setDataTransaction((prev: any) => ({
      ...prev,
      method: null,
    }));
  };

  return (
    <div className="grid grid-cols-4 w-full gap-x-4 mt-6">
      <div className="col-span-2 col-start-2 ">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Create a new Deposit</h1>
          <CardBuilder title="Account">
            <div className="grid grid-cols-6">
              <div className="col-span-1">
                <div className="flex flex-col gap-2">
                  <h5>Name</h5>
                  <h5>Balance</h5>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col gap-2 font-medium">
                  <p>: {user.name}</p>
                  <p>
                    :{" "}
                    {Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(user.amount)}
                  </p>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col gap-2">
                  <h5>Email</h5>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col gap-2 font-medium">
                  <p>: {user.email}</p>
                </div>
              </div>
            </div>
          </CardBuilder>
          <CardBuilder title="Deposit Amount">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="10000"
                className="px-2 w-72 rounded-sm"
                onChange={(e) => setDepositAmount(Number(e.target.value))}
              />
              <Button type="default" onClick={onNext}>
                Next
              </Button>
            </div>
          </CardBuilder>
          {dataTransaction ? (
            <>
              <CardBuilder title="Payment Method">
                <div className="flex gap-2 text-white">
                  {dataTransaction.method ? (
                    <div className="flex gap-4">
                      <div
                        className="h-12 w-28 bg-black flex items-center justify-center rounded-md cursor-pointer"
                        onClick={onCancelPayment}
                      >
                        {dataTransaction.method}
                      </div>
                      <input
                        type="number"
                        placeholder="0856888888"
                        className="px-4 text-black"
                      />
                    </div>
                  ) : (
                    paymentMethod.map((payment, index: number) => (
                      <div
                        className="h-12 w-28 bg-black flex items-center justify-center rounded-md cursor-pointer"
                        key={index}
                        onClick={() => onClickPayment(payment)}
                      >
                        {payment}
                      </div>
                    ))
                  )}
                </div>
              </CardBuilder>
              <Button type="default" fullWidth>
                Submit
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default DepositPage;

const CardBuilder = ({ children, title }: any) => {
  return (
    <div className="py-4 px-4 bg-gray-200 rounded-lg text-black flex justify-center align-center flex-col gap-4">
      <h3 className="text-xl font-semibold text-left">{title}</h3>
      {children}
    </div>
  );
};

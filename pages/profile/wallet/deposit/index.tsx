import Button from "@/components/button/button";
import formatCurrency from "@/components/format/userBalance";
import ConfirmSave from "@/components/modal/confirmSave";
import useTransaction from "@/lib/hooks/useTransactions";
import useUser from "@/lib/hooks/useUser";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const minimumDeposit = 10000;
const PhoneRegex = /^8[1-9][0-9]{7,10}$/;

const DepositPage = () => {
  const { user, updateBalance } = useUser();
  const { addTransaction } = useTransaction();
  const router = useRouter();

  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [dataTransaction, setDataTransaction] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const paymentMethod = ["Shoopepay", "Dana", "Gopay", "OVO"];
  const [inputError, setInputError] = useState<boolean>(false);
  const [inputPhoneNumberError, setInputPhoneNumberError] =
    useState<boolean>(false);
  const [isShowConfirmationModal, setIsShowConfirmationModal] =
    useState<boolean>(false);

  const onNext = () => {
    if (depositAmount >= minimumDeposit) {
      setInputError(false);
      setDataTransaction((prev: any) => ({
        ...prev,
        amount: depositAmount,
      }));
    } else {
      setInputError(true);
    }
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
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(Number(event.target.value));
    if (Number(event.target.value) < minimumDeposit) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };
  const onSubmit = () => {
    if (PhoneRegex.test(phoneNumber) && !inputError) {
      setInputPhoneNumberError(false);
      addTransaction({
        ...dataTransaction,
        description: "New Deposit",
        phoneNumber: phoneNumber,
        status: "pending",
        userId: user.id,
        type: "deposit",
      });
      updateBalance(user.id, user.amount + depositAmount);
    } else {
      setInputPhoneNumberError(true);
    }
    setIsShowConfirmationModal(false);
    router.reload();
  };

  return (
    <>
      <div className="grid grid-cols-4 w-full gap-x-4 mt-6">
        <div className="col-span-2 col-start-2 ">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Create a new Deposit</h1>
            <CardBuilder title="Account">
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-1">
                  <div className="flex flex-col gap-2">
                    <h5>Name</h5>
                    <h5>Balance</h5>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col gap-2 font-medium">
                    <p className="truncate">: {user.name}</p>
                    <p>: {formatCurrency(user?.amount)}</p>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col gap-2">
                    <h5>Email</h5>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col gap-2 font-medium">
                    <p className="truncate">: {user.email}</p>
                  </div>
                </div>
              </div>
            </CardBuilder>
            <CardBuilder title="Deposit Amount">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-md">Rp </p>
                  <input
                    type="number"
                    placeholder="10000"
                    className="px-2 w-72 rounded-sm"
                    onChange={(e) => onChangeValue(e)}
                  />
                  <Button type="default" onClick={onNext} disabled={inputError}>
                    Next
                  </Button>
                </div>
                <p
                  className={`text-gray-800 text-sm ${
                    inputError ? "text-red-500" : ""
                  }`}
                >
                  *Minimum deposit amount is Rp 10.000
                </p>
              </div>
            </CardBuilder>
            {dataTransaction ? (
              <>
                <CardBuilder title="Payment Method">
                  <div className="flex gap-2 text-white">
                    {dataTransaction.method ? (
                      <div className="flex gap-4 ">
                        <div
                          className="h-12 w-28 bg-black flex items-center justify-center rounded-md cursor-pointer"
                          onClick={onCancelPayment}
                        >
                          {dataTransaction.method}
                        </div>
                        <div className="flex gap-2 items-center">
                          <p className="font-semibold text-md text-black">
                            +62
                          </p>
                          <input
                            type="number"
                            placeholder="856888888"
                            className="px-2 text-black"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          {inputPhoneNumberError ? (
                            <p className="font-medium text-sm text-red-500">
                              *Enter The Correct Phone Number
                            </p>
                          ) : null}
                        </div>
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
                <Button
                  type="default"
                  fullWidth
                  onClick={() => setIsShowConfirmationModal(true)}
                >
                  Deposit
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <ConfirmSave
        onSubmit={onSubmit}
        setShowModal={setIsShowConfirmationModal}
        showModal={isShowConfirmationModal}
      />
    </>
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

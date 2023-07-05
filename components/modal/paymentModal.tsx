import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Modal } from "flowbite-react";
import Button from "../button/button";
import { Movie, Showtime } from "@/types/interface";
import useUser from "@/lib/hooks/useUser";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import formatCurrency from "../format/userBalance";

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  movie: Movie;
  showtime: Showtime | null;
  seatNumbers: number[];
};
const PaymentModal = (props: ModalProps) => {
  const { user } = useUser();
  const [lowBalance, setLowBalance] = useState(false);

  const submitValidate = () => {
    if (props.movie.ticket_price <= user.amount) {
      props.onSubmit();
    } else {
      setLowBalance(true);
    }
  };
  const onCloseModal = () => {
    props.setShowModal(false);
    setLowBalance(false);
  };

  return (
    <Modal size="md" show={props.showModal} popup={true} onClose={onCloseModal}>
      <Modal.Header className="ml-2">Payment</Modal.Header>
      <hr />
      <Modal.Body className="py-2">
        <div className="flex flex-col gap-2">
          <h3>Ticket</h3>
          <div className="flex w-full">
            <div className="flex flex-col w-1/3 gap-1">
              <p>Title</p>
              <p>Showtime</p>
              <p>Price</p>
              <p>Seat Number</p>
            </div>
            <div className="flex flex-col w-2/3 gap-1">
              <p className="w-full truncate">{props.movie.title}</p>
              <p>{props.showtime?.time}</p>
              <p className="w-full truncate">
                {formatCurrency(props.movie.ticket_price)}
              </p>
              <div className="flex gap-2">
                {props.seatNumbers.map((number: number, index: number) => (
                  <p
                    key={index}
                    className="bg-gray-600 h-6 w-6 rounded-sm text-white text-xs font-semibold flex items-center justify-center"
                  >
                    {number}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <hr />
      <Modal.Body className="py-2">
        <div className="flex flex-col gap-2">
          <h3>Payment Method</h3>
          <div
            className={`flex gap-2 items-center ${
              lowBalance ? "text-red-500" : ""
            }`}
          >
            <input
              type="radio"
              id="payment-method"
              checked
              className={lowBalance ? "text-red-500" : ""}
            />
            <label htmlFor="payment-method">Balance</label>
            <p className={`font-semibold `}>{formatCurrency(user.amount)}</p>
            <Link
              href="/profile/wallet/deposit"
              target="_blank"
              className={`flex flex-row justify-center items-center gap-2 text-white bg-[#824179] hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-[#824179] dark:hover:bg-[#733865] focus:outline-none ${
                lowBalance ? "border-2 border-red-500" : ""
              }`}
              onClick={() => setLowBalance(false)}
            >
              Deposit
            </Link>
          </div>
          {lowBalance ? (
            <p className="text-red-500 text-sm">
              Your balance is too low. Please Deposit before continue
            </p>
          ) : null}
        </div>
      </Modal.Body>
      <hr />
      <Modal.Footer>
        <div className="flex justify-center w-full ">
          <Button onClick={submitValidate} fullWidth>
            Submit
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default PaymentModal;

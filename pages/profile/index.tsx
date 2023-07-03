import Button from "@/components/button/button";
import TicketBuilder from "@/components/card/ticketBuilder";

import useTicket from "@/lib/hooks/useTicket";
import useTransaction from "@/lib/hooks/useTransactions";
import useUser from "@/lib/hooks/useUser";
import { Ticket, Transaction } from "@/types/interface";
import Image from "next/image";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";

const UserProfile = () => {
  const router = useRouter();
  const { user } = useUser();
  const { ticket } = useTicket();
  const { transactions } = useTransaction();
  return (
    <div className="grid grid-cols-8 relative mt-16 h-screen gap-5">
      <div className="col-span-2 col-start-2 justify-end flex bottom-0 left-0 right-0">
        <div className="h-fit w-full sticky top-2 flex flex-col gap-2">
          <div className="w-full py-6 px-4 bg-gray-200 rounded-lg items-center flex flex-col gap-3">
            <Image
              src={user ? user.image : "/blank.png"}
              className="rounded-full"
              alt="movie poster"
              height={150}
              width={150}
            />
            <div className="flex flex-col gap-1 items-center">
              <h1>
                <span className="text-2xl font-semibold">
                  {user ? user.name : "Your Name"}
                </span>
              </h1>
              <h3>
                <span className="text-xl font-semibold">
                  {user ? user.email : "Your Email"}
                </span>
              </h3>
            </div>
          </div>
          <div className="w-full p-4 bg-gray-200 rounded-lg items-center flex flex-col gap-3">
            <h4 className="text-xl font-semibold">
              {user?.amount
                ? Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(user.amount)
                : "Rp 0"}
            </h4>
            <div className="flex gap-2 w-full px-4">
              <div className="basis-1/2">
                <Button
                  fullWidth
                  onClick={() => router.push("/profile/wallet/withdraw")}
                >
                  Withdraw
                </Button>
              </div>
              <div className="basis-1/2">
                <Button
                  fullWidth
                  onClick={() => router.push("/profile/wallet/deposit")}
                >
                  Deposit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 h-[200vh] col-start-4 flex flex-col gap-4">
        <CardBuilder title="Your Tickets">
          {ticket && ticket.length > 0 ? (
            ticket.map((ticket: Ticket, index: number) => (
              <TicketBuilder ticketCol={ticket} key={index} />
            ))
          ) : (
            <EmptyState link="/schedule" linkName="Get Ticket" title="Ticket" />
          )}
        </CardBuilder>
        <CardBuilder title="Balance History">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction: Transaction) => (
              <div className="bg-gray-400 rounded-md px-4 py-2 flex justify-between">
                <div className="">
                  <p>{transaction.type}</p>
                </div>
                <div className="">
                  {transaction.type === "deposit" ? (
                    <p className="text-green-700">+ {transaction.amount}</p>
                  ) : (
                    <p className="text-red-400">- {transaction.amount}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              link="/profile/wallet/deposit"
              linkName="Deposit"
              title="Transaction"
            />
          )}
        </CardBuilder>
      </div>
    </div>
  );
};

const CardBuilder = ({ children, title }: any) => {
  return (
    <div className="py-4 px-4 bg-gray-200 rounded-lg text-black flex justify-center align-center flex-col gap-2">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      {children}
    </div>
  );
};

export default UserProfile;

const EmptyState = ({ link, linkName, title }: any) => {
  const router = useRouter();
  return (
    <div className="bg-gray-400 py-12 flex justify-center items-center rounded-md gap-4 flex-col">
      <div className="p-3 rounded-full bg-red-100">
        <GrClose size={48} color="white" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-center font-semibold text-lg">
          Your {title} is Empty
        </p>
        <Button type="alternative" onClick={() => router.push(link)}>
          {linkName}
        </Button>
      </div>
    </div>
  );
};

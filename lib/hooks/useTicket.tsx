import { useEffect, useState, useCallback } from "react";
import { Ticket, User } from "@/types/interface";
import { db } from "../firebase/firebase.config";
import { defaultShowtime, defaultTicket } from "../defaultValue";
import { useSession } from "next-auth/react";

// get user data
export default function useTicket() {
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const session = useSession() as any;

  const getTickets = useCallback(async (user: User) => {
    let data = db
      .collection("ticket")
      .where("userId", "==", user.id)
      .limit(5)
      .get()
      .then((res) => {
        return res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });
    data.then((res: any) => {
      console.log(res);
      setTicket(res);
    });
  }, []);

  useEffect(() => {
    if (session.data) {
      getTickets(session.data.user);
    }
  }, [session]);

  return { ticket };
}

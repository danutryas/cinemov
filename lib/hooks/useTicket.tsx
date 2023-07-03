import { useEffect, useState, useCallback } from "react";
import { Ticket } from "@/types/interface";
import { db } from "../firebase/firebase.config";
import { defaultShowtime, defaultTicket } from "../defaultValue";

// get user data
export default function useTicket() {
  const [ticket, setTicket] = useState<Ticket[]>([]);

  const getTickets = useCallback(async () => {
    let data = db
      .collection("ticket")
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
    getTickets();
  }, []);

  return { ticket };
}

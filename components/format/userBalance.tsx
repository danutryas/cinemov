import useUser from "@/lib/hooks/useUser";

const formatCurrency = (amount: number) => {
  return amount
    ? Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount)
    : "Rp 0";
};
export default formatCurrency;

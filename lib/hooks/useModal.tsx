import EmbedVideo from "@/components/modal/embedVideo";
import { ReactNode, createContext, useContext, useState } from "react";
import { defaultUrl } from "../defaultValue";
type ModalContext = {
  isActiveModal: boolean;
  setActiveModal: (url: string) => void;
  setInActiveModal: () => void;
};

const ModalContext = createContext<ModalContext>({
  isActiveModal: false,
  setActiveModal: () => {},
  setInActiveModal: () => {},
});

export const useModal = () => useContext(ModalContext);

type ModalLayoutProps = {
  children: ReactNode;
};

const ModalLayout = ({ children }: ModalLayoutProps) => {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [src, setSrc] = useState(defaultUrl);

  const setInActiveModal = () => {
    setIsActiveModal(false);
    setSrc(defaultUrl);
  };

  const setActiveModal = (url: string) => {
    setIsActiveModal(true);
    setSrc(url);
  };
  return (
    <ModalContext.Provider
      value={{ isActiveModal, setInActiveModal, setActiveModal }}
    >
      {children}
      <EmbedVideo src={src} />
    </ModalContext.Provider>
  );
};
export default ModalLayout;

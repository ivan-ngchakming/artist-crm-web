import { ReactNode } from "react";
import { createContext } from "../utils";
import { mockEmails } from "../mocks";

export type MailAccount = {
  name: string;
  address: string;
};

type MailEnvelope = {
  date: Date | string; // remove string from type
  subject: string;
  from: MailAccount[];
  sender: MailAccount[];
  replyTo: MailAccount[];
  to: MailAccount[];
  inReplyTo: string;
  messageId: string;
};

export type Mail = {
  seq: number;
  emailId: string;
  uid: number;
  modseq: string;
  flags: string[];
  envelope: MailEnvelope;
  id: string;
  bodyPartsDecoded: string[];
};

type MailContextValue = {
  mails: Mail[];
  account: MailAccount;
};

const [useMailContext, MailContext] = createContext<MailContextValue>();

export const useMail = () => useMailContext();

export const MailProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    mails: mockEmails,
    account: { name: "Ivan", address: "ivan.ng.chak.ming@gmail.com" },
  };

  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
};

export default MailContext;

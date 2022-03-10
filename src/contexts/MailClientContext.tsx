import { ReactNode } from "react";
import { createContext } from "../utils";
import { mockEmails } from "../mocks";

type MailAccount = {
  name: string;
  address: string;
};

export type Mail = {
  id: string;
  flags: string[];
  date: Date | string; // TODO: investigate if string is needed here
  subject: string;
  from: MailAccount[];
  sender: MailAccount[];
  replyTo: MailAccount[];
  to: MailAccount[];
  inReplyTo?: string;
  messageId: string;
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

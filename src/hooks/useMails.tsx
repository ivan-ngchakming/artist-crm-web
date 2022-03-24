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

interface UseMails {
  (): {
    mails: Mail[];
    account: MailAccount;
  };
}

export const useMails: UseMails = () => {
  return {
    mails: mockEmails,
    account: { name: "Ivan", address: "ivan.ng.chak.ming@gmail.com" },
  };
};

export default useMails;

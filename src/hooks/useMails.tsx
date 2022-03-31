import { useCookies } from "react-cookie";
import { useQuery, UseQueryResult } from "react-query";
import { listEmails } from "../queries";

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
    validCredentials: boolean;
    mails: Mail[];
    account: MailAccount;
  } & Partial<UseQueryResult>;
}

export const useMails: UseMails = () => {
  const [cookies] = useCookies(["emailUser", "emailPass"]);
  const { emailUser, emailPass } = cookies;
  const validCredentials = !!emailUser && !!emailPass;

  const { data, ...restResult } = useQuery<Mail[]>(["listEmails"], () =>
    listEmails()
  );

  return {
    ...restResult,
    validCredentials,
    mails: data || ([] as Mail[]),
    account: { name: "Ivan", address: emailUser },
  };
};

export default useMails;

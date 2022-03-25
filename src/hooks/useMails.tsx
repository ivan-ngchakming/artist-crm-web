import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { mockEmails } from "../mocks";
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
    isLoading: boolean;
    validCredentials: boolean;
    mails: Mail[];
    account: MailAccount;
  };
}

export const useMails: UseMails = () => {
  const [cookies] = useCookies(["emailUser", "emailPass"]);
  const { emailUser, emailPass } = cookies;
  const validCredentials = !!emailUser && !!emailPass;

  const { data, isLoading } = useQuery<Mail[]>(["listEmails"], () =>
    listEmails()
  );

  return {
    isLoading,
    validCredentials,
    mails: data || ([] as Mail[]),
    account: { name: "Ivan", address: emailUser },
  };
};

export default useMails;

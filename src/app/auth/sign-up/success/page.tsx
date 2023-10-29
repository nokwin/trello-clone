import { ResendEmail } from "@/components";

interface SignUpSuccessPage {
  searchParams: {
    email: string;
  };
}

export default function SignUpSuccessPage({ searchParams }: SignUpSuccessPage) {
  const { email } = searchParams;

  return (
    <div className="h-content flex-center">
      <div className="block-wrapper text-white text-center">
        <h1 className="text-3xl font-bold">Check your email</h1>
        <p>
          You're almost there! We sent an email to <b>{email}</b>
        </p>
        <p>
          Just click on the link in that email to complete your signup. If you
          don't see it, you may need to <b>check your spam</b> folder.
        </p>
        <p>Still can't find the email?</p>
        <ResendEmail email={email} />
      </div>
    </div>
  );
}

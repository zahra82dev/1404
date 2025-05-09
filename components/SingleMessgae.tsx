import React from "react";
import { IMessage } from "@/models/Message";
import Link from "next/link";
export const SingleMessgae = ({ message }: { message: IMessage }) => {
  return (
    <div className="border-2 border-teal-600 p-2 rounded-md">
      <div>
        <p>
          Name: <span>{message?.name}</span>
        </p>
        <p>
          Email: <span>{message?.email}</span>
        </p>

        <p>
          Phone: <span>{message?.phone}</span>
        </p>
        <p className="text-teal-600">
          <Link href={`/cars/${message.car}`}> Link to the ad</Link>
        </p>
      </div>
      <div>
        <p>{message.body}</p>
      </div>
    </div>
  );
};

export default SingleMessgae;

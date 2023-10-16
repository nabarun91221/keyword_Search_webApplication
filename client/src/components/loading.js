import React from "react";
import Image from "next/image";
export const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading == true ? (
        <div className="spinner">
          <Image
            src="/spinner.gif"
            alt="loding spinner"
            width={60}
            height={60}
            className="rounded-md object-contain"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

import React, { FC, useState, useEffect } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { useRecoilState } from "recoil";
import { clientAtom } from "../../../recoil/atom/clientAtom";
import { Loading } from "../../loading";

interface KycFormProps {
  nextScene: () => void; // Define the type of nextScene
}
interface Token {
  token: string;
  userId: string;
  // Add other fields based on your API response
}

export const KycForm: FC<KycFormProps> = ({ nextScene }) => {
  const [accessToken, setAccessToken] = useState<Token>({
    token: "",
    userId: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const applicantEmail = "";
  const applicantPhone = "";

  //---begin use recoil ---//

  const [clientState, setClientState] = useRecoilState(clientAtom);

  //---end use recoil ---//

  useEffect(() => {
    const fetchData = async () => {
      console.log("getting token now...");
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/getToken/${clientState.userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: Token = await response.json();
        console.log("response==================>", result);
        setAccessToken(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientState.userId]);

  return (
    <div className="m-6 h-full">
      {accessToken.token !== "" ? (
        <>
          <SumsubWebSdk
            accessToken={accessToken.token}
            expirationHandler={() => Promise.resolve(accessToken.token)}
            config={{
              lang: "ru-RU",
              email: applicantEmail,
              phone: applicantPhone,
              i18n: {
                document: {
                  subTitles: {
                    IDENTITY: "Upload a document that proves your identity",
                  },
                },
              },
              // onMessage: (type: any, payload: any) => {
              //   console.log("WebSDK onMessage", type, payload);
              // },
              uiConf: {
                customCssStr:
                  ":root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 60px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}",
              },
              // onError: (error: any) => {
              //   console.error("WebSDK onError", error);
              // },
            }}
            options={{ addViewportTag: false, adaptIframeHeight: true }}
            onMessage={(type: any, payload: any) => {
              console.log("onMessage", type, payload);
            }}
            onError={(data: any) => console.log("onError", data)}
          />
        </>
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <Loading />
          <div>
            <button
              className="my-4 w-full bg-[#CB4D8C] rounded-md p-2 active:scale-90 transition-transform ease-in-out delay-150"
              onClick={nextScene}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

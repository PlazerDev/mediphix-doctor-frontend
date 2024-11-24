import { ConfigProvider } from "antd";
import pattern from "./../../assets/images/signup/widgetsBg.png";
import SignUpCardBody from "./components/SignUpCardBody";

function SignUpPage() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff7300",
          colorInfo: "#ff7300",
          borderRadius: 8,
        },
        components: {
          Pagination: {
            itemActiveBg: "", // remove the default active bg color
          },
        },
      }}
    >
      <div className="bg-mediphix_background h-screen w-screen relative">
        <div className="flex justify-end h-full">
          <img
            src={pattern}
            alt="Background Image"
            className="object-cover h-full max-h-screen mix-blend-luminosity"
          />
        </div>

        <div className="absolute top-0 left-0 flex justify-center items-center z-10 h-full w-full">
          <SignUpCardBody />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default SignUpPage;

import "@/styles/globals.css";
import { setupClietnAxios } from "@/utils/axios.utils";
import { isClient } from "@/utils/common.utils";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

if(isClient){
  setupClietnAxios()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthLayout from "@/components/AuthLayout";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </QueryClientProvider>
    </Provider>
  );
}
